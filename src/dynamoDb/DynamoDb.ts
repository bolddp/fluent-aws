import { DynamoDbTable } from "./DynamoDbTable";
import { ApiNode } from "../node/ApiNode";
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { DynamoDbTableCollection } from "./DynamoDbTableCollection";

export class DynamoDb extends ApiNode {
  tableCollection: DynamoDbTableCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.tableCollection = ApiNodeFactory.dynamoDbTableCollection(this);
  }

  tables(): DynamoDbTableCollection {
    return this.tableCollection;
  }

  table(id: string): DynamoDbTable {
    return this.tableCollection.getById(id);
  }
}