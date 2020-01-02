import { DynamoDbTable } from "./DynamoDbTable";
import { ApiNode } from "../node/ApiNode";
import { DynamoDbTableCollection } from "./DynamoDbTableCollection";
export declare class DynamoDb extends ApiNode {
    tableCollection: DynamoDbTableCollection;
    constructor(parent: ApiNode);
    tables(): DynamoDbTableCollection;
    table(id: string): DynamoDbTable;
}
