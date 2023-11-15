import { DynamoDbTable } from './DynamoDbTable';
import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { DynamoDbTableCollection } from './DynamoDbTableCollection';
import { AwsApi } from '../awsapi/AwsApi';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

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

  async client(): Promise<DynamoDB> {
    await this.ensureResolved();
    return AwsApi.dynamoDb(this.config()).getDynamoDb();
  }

  async docClient(): Promise<DynamoDBDocument> {
    await this.ensureResolved();
    return AwsApi.dynamoDb(this.config()).getDocClient();
  }
}
