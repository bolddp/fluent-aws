import { DynamoDbTable } from './DynamoDbTable';
import { ApiNode } from '../node/ApiNode';
import { DynamoDbTableCollection } from './DynamoDbTableCollection';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
export declare class DynamoDb extends ApiNode {
    tableCollection: DynamoDbTableCollection;
    constructor(parent: ApiNode);
    tables(): DynamoDbTableCollection;
    table(id: string): DynamoDbTable;
    client(): Promise<DynamoDB>;
    docClient(): Promise<DynamoDBDocument>;
}
