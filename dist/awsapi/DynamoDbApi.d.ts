import { DynamoDbItem } from './../dynamoDb/DynamoDbTable';
import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class DynamoDbApi {
    config: FluentAwsConfig;
    dynamoDb: () => AWS.DynamoDB;
    docClient: () => AWS.DynamoDB.DocumentClient;
    constructor(config: FluentAwsConfig);
    listTableNames(): Promise<string[]>;
    describeTable(tableName: string): Promise<AWS.DynamoDB.TableDescription>;
    get(input: AWS.DynamoDB.GetItemInput): Promise<AWS.DynamoDB.AttributeMap>;
    query(input: AWS.DynamoDB.QueryInput): Promise<AWS.DynamoDB.AttributeMap[]>;
    put(tableName: string, item: DynamoDbItem): Promise<void>;
    delete(tableName: string, key: AWS.DynamoDB.DocumentClient.Key): Promise<void>;
    batchGet(tableName: string, keys: AWS.DynamoDB.DocumentClient.Key[]): Promise<AWS.DynamoDB.AttributeMap[]>;
}
