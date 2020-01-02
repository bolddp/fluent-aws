import { DynamoDbItem } from './../dynamoDb/DynamoDbTable';
import * as AWS from 'aws-sdk';
export declare class DynamoDbApi {
    dynamoDb: () => AWS.DynamoDB;
    docClient: () => AWS.DynamoDB.DocumentClient;
    listTableNames(): Promise<string[]>;
    describeTable(tableName: string): Promise<AWS.DynamoDB.TableDescription>;
    get(input: AWS.DynamoDB.GetItemInput): Promise<AWS.DynamoDB.AttributeMap>;
    query(input: AWS.DynamoDB.QueryInput): Promise<AWS.DynamoDB.AttributeMap[]>;
    put(tableName: string, item: DynamoDbItem): Promise<void>;
    delete(tableName: string, key: AWS.DynamoDB.DocumentClient.Key): Promise<void>;
}
