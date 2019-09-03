import * as AWS from 'aws-sdk';
import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';

export type DynamoDbItem = { [key: string]: any };
export type DynamoDbKey = { [key: string]: any };

export class DynamoDbTable extends AwsDataApiNode<AWS.DynamoDB.TableDescription> {
  tableName: string;

  constructor(parent: ApiNode, tableName: string) {
    super(parent);
    this.tableName = tableName;
  }

  loadAwsData() {
    return AwsApi.dynamoDb.describeTable(this.tableName);
  }

  async get(key: DynamoDbKey): Promise<DynamoDbItem> {
    await this.ensureResolved();
    return AwsApi.dynamoDb.get(this.tableName, key);
  }

  async put(item: DynamoDbItem): Promise<void> {
    await this.ensureResolved();
    return AwsApi.dynamoDb.put(this.tableName, item);
  }

  async delete(key: DynamoDbKey): Promise<void> {
    await this.ensureResolved();
    return AwsApi.dynamoDb.delete(this.tableName, key);
  }
}