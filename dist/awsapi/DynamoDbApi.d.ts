import { DynamoDbItem } from './../dynamoDb/DynamoDbTable';
import { FluentAwsConfig } from '../FluentAwsConfig';
import { DynamoDB, GetItemInput, QueryInput, TableDescription } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
export declare class DynamoDbApi {
    private config;
    private dynamoDb;
    private docClient;
    constructor(config: FluentAwsConfig);
    getDynamoDb(): DynamoDB;
    getDocClient(): DynamoDBDocument;
    listTableNames(): Promise<string[]>;
    describeTable(tableName: string): Promise<TableDescription>;
    get(input: GetItemInput): Promise<Record<string, any>>;
    query(input: QueryInput): Promise<Record<string, any>[]>;
    put(tableName: string, item: DynamoDbItem): Promise<void>;
    delete(tableName: string, key: Record<string, any>): Promise<void>;
    batchGet(tableName: string, keys: Record<string, any>[]): Promise<Record<string, any>[]>;
}
