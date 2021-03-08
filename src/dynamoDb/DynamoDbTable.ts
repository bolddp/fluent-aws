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
    return AwsApi.dynamoDb(this.config()).describeTable(this.tableName);
  }

  async get(key: DynamoDbKey): Promise<DynamoDbItem> {
    await this.ensureResolved();
    return AwsApi.dynamoDb(this.config()).get({
      TableName: this.tableName,
      Key: key
    });
  }

  async query(key: DynamoDbKey): Promise<DynamoDbItem[]> {
    await this.ensureResolved();
    const keyConditionExpression = Object.keys(key).map(k => `${k} = :${k.toLowerCase()}`).join(' and ');
    const expressionAttributeValues: { [key: string]: any } = {};
    Object.keys(key).forEach(k => expressionAttributeValues[`:${k.toLowerCase()}`] = key[k]);
    return AwsApi.dynamoDb(this.config()).query({
      TableName: this.tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues
    })
  }

  async queryByIndex(indexName: string, key: DynamoDbKey): Promise<DynamoDbItem[]> {
    await this.ensureResolved();
    const keyConditionExpression = Object.keys(key).map(k => `${k} = :${k.toLowerCase()}`).join(' and ');
    const expressionAttributeValues: { [key: string]: any } = {};
    Object.keys(key).forEach(k => expressionAttributeValues[`:${k.toLowerCase()}`] = key[k]);
    return AwsApi.dynamoDb(this.config()).query({
      TableName: this.tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues
    })
  }

  async put(item: DynamoDbItem): Promise<void> {
    await this.ensureResolved();
    return AwsApi.dynamoDb(this.config()).put(this.tableName, item);
  }

  async delete(key: DynamoDbKey): Promise<void> {
    await this.ensureResolved();
    return AwsApi.dynamoDb(this.config()).delete(this.tableName, key);
  }
}