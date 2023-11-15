import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { TableDescription } from '@aws-sdk/client-dynamodb';
export type DynamoDbItem = {
    [key: string]: any;
};
export type DynamoDbKey = {
    [key: string]: any;
};
export declare class DynamoDbTable extends AwsDataApiNode<TableDescription> {
    tableName: string;
    constructor(parent: ApiNode, tableName: string);
    loadAwsData(): Promise<TableDescription>;
    get(key: DynamoDbKey): Promise<DynamoDbItem>;
    query(key: DynamoDbKey): Promise<DynamoDbItem[]>;
    queryByIndex(indexName: string, key: DynamoDbKey): Promise<DynamoDbItem[]>;
    put(item: DynamoDbItem): Promise<void>;
    delete(key: DynamoDbKey): Promise<void>;
    batchGet(keys: DynamoDbKey[]): Promise<DynamoDbItem[]>;
}
