import * as AWS from 'aws-sdk';
import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
export declare type DynamoDbItem = {
    [key: string]: any;
};
export declare type DynamoDbKey = {
    [key: string]: any;
};
export declare class DynamoDbTable extends AwsDataApiNode<AWS.DynamoDB.TableDescription> {
    tableName: string;
    constructor(parent: ApiNode, tableName: string);
    loadAwsData(): Promise<AWS.DynamoDB.TableDescription>;
    get(key: DynamoDbKey): Promise<DynamoDbItem>;
    query(key: DynamoDbKey): Promise<DynamoDbItem[]>;
    queryByIndex(indexName: string, key: DynamoDbKey): Promise<DynamoDbItem[]>;
    put(item: DynamoDbItem): Promise<void>;
    delete(key: DynamoDbKey): Promise<void>;
}
