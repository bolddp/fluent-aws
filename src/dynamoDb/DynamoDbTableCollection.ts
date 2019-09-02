import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { DynamoDbTable } from './DynamoDbTable';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class DynamoDbTableCollection extends ApiNodeCollection<DynamoDbTable, string> {
  apiNodeFromAwsData(data: string) {
    return ApiNodeFactory.dynamoDbTable(this, data);
  }

  apiNodeFromId(id: string) {
    return ApiNodeFactory.dynamoDbTable(this, id);
  }

  async load(): Promise<string[]> {
    return await AwsApi.dynamoDb.listTableNames();
  }
}