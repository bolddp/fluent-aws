import { DynamoDbItem } from './../dynamoDb/DynamoDbTable';
import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:DynamoDbApi');

export class DynamoDbApi {
  dynamoDb = () => new AWS.DynamoDB();
  docClient = () => new AWS.DynamoDB.DocumentClient();

  async listTableNames(): Promise<string[]> {
    debug('listing tables');
    const response = await this.dynamoDb().listTables({}).promise();
    debug('listed tables');
    return response.TableNames;
  }

  async describeTable(tableName: string): Promise<AWS.DynamoDB.TableDescription> {
    debug('describing table: %s', tableName);
    const response = await this.dynamoDb().describeTable({
      TableName: tableName
    }).promise();
    debug('described table');
    return response.Table;
  }

  async get(input: AWS.DynamoDB.GetItemInput): Promise<AWS.DynamoDB.AttributeMap> {
    debug('getting item: %s, key: %j', input.TableName, input.Key);
    const response = await this.docClient().get(input).promise();
    debug('got item');
    return response.Item;
  }

  async query(input: AWS.DynamoDB.QueryInput): Promise<AWS.DynamoDB.AttributeMap[]> {
    debug('querying: %j', input);
    let result: AWS.DynamoDB.AttributeMap[] = [];
    const fnc = async (fncInput: AWS.DynamoDB.QueryInput) => {
      const response = await this.docClient().query(fncInput).promise();
      result = result.concat(response.Items || []);
      debug('#items: %d', response.Items.length);
      if (response.LastEvaluatedKey) {
        const newInput = { ...fncInput, ExclusiveStartKey: response.LastEvaluatedKey }
        debug('queries recursive: %j', newInput);
        await fnc(newInput);
      }
    }
    await fnc(input);
    debug('queried');
    return result;
  }

  async put(tableName: string, item: DynamoDbItem): Promise<void> {
    debug('putting item: %s, item: %j', tableName, item);
    await this.docClient().put({
      TableName: tableName,
      Item: item
    }).promise();
    debug('put item');
  }

  async delete(tableName: string, key: AWS.DynamoDB.DocumentClient.Key): Promise<void> {
    debug('deleting item: %s, key: %j', tableName, key);
    await this.docClient().delete({
      TableName: tableName,
      Key: key
    }).promise();
    debug('deleted item');
  }
}