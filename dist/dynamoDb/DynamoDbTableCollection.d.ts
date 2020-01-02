import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { DynamoDbTable } from './DynamoDbTable';
export declare class DynamoDbTableCollection extends ApiNodeCollection<DynamoDbTable, string> {
    apiNodeFromAwsData(data: string): DynamoDbTable;
    apiNodeFromId(id: string): DynamoDbTable;
    load(): Promise<string[]>;
}
