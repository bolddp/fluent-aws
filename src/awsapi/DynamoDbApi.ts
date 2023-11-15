import { DynamoDbItem } from './../dynamoDb/DynamoDbTable';
import { FluentAwsConfig } from '../FluentAwsConfig';
import {
  DynamoDB,
  GetItemInput,
  QueryInput,
  TableDescription,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const debug = require('debug')('fluentaws:DynamoDbApi');

export class DynamoDbApi {
  private dynamoDb = () => new DynamoDB(this.config);
  private docClient = () =>
    DynamoDBDocument.from(this.dynamoDb(), {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });

  constructor(private config: FluentAwsConfig) {}

  getDynamoDb(): DynamoDB {
    return this.dynamoDb();
  }

  getDocClient(): DynamoDBDocument {
    return this.docClient();
  }

  async listTableNames(): Promise<string[]> {
    debug('listing tables');
    const response = await this.dynamoDb().listTables({});
    debug('listed tables');
    return response.TableNames;
  }

  async describeTable(tableName: string): Promise<TableDescription> {
    debug('describing table: %s', tableName);
    const response = await this.dynamoDb().describeTable({
      TableName: tableName,
    });
    debug('described table');
    return response.Table;
  }

  async get(input: GetItemInput): Promise<Record<string, any>> {
    debug('getting item: %s, key: %j', input.TableName, input.Key);
    const response = await this.docClient().get(input);
    debug('got item');
    return response.Item;
  }

  async query(input: QueryInput): Promise<Record<string, any>[]> {
    debug('querying: %j', input);
    let result: Record<string, any>[] = [];
    const fnc = async (fncInput: QueryInput) => {
      const response = await this.docClient().query(fncInput);
      result = result.concat(response.Items || []);
      debug('#items: %d', response.Items.length);
      if (response.LastEvaluatedKey) {
        const newInput = {
          ...fncInput,
          ExclusiveStartKey: response.LastEvaluatedKey,
        };
        debug('queries recursive: %j', newInput);
        await fnc(newInput);
      }
    };
    await fnc(input);
    debug('queried');
    return result;
  }

  async put(tableName: string, item: DynamoDbItem): Promise<void> {
    debug('putting item: %s, item: %j', tableName, item);
    await this.docClient().put({
      TableName: tableName,
      Item: item,
    });
    debug('put item');
  }

  async delete(tableName: string, key: Record<string, any>): Promise<void> {
    debug('deleting item: %s, key: %j', tableName, key);
    await this.docClient().delete({
      TableName: tableName,
      Key: key,
    });
    debug('deleted item');
  }

  async batchGet(
    tableName: string,
    keys: Record<string, any>[]
  ): Promise<Record<string, any>[]> {
    debug('batchGet: %s, #keys: %d', tableName, keys.length);
    const batchSize = 100;
    const batches = keys.reduce<Record<string, any>[][]>((acc, key, index) => {
      const batchIndex = Math.floor(index / batchSize);
      if (index % batchSize == 0) {
        acc[batchIndex] = [];
      }
      acc[batchIndex].push(key);
      return acc;
    }, []);
    let result: Record<string, any>[] = [];
    for (const keyBatch of batches) {
      debug('getting batch of %d', keyBatch.length);
      const rsp = await this.docClient().batchGet({
        RequestItems: {
          [tableName]: {
            ConsistentRead: true,
            Keys: keyBatch,
          },
        },
      });
      debug('did get batch');
      result.push(...rsp.Responses[tableName]);
    }
    debug('did batchGet');
    return result;
  }
}
