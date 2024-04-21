import { SqsQueue } from './SqsQueue';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNodeFactory } from '../node/ApiNodeFactory';

export class SqsQueueCollection extends ApiNodeCollection<SqsQueue, string> {
  load(): Promise<string[]> {
    return AwsApi.sqs(this.config()).listQueueUrls();
  }

  apiNodeFromAwsData(url: string): SqsQueue {
    return ApiNodeFactory.sqsQueue(this, url);
  }

  apiNodeFromId(id: string): SqsQueue {
    return ApiNodeFactory.sqsQueue(this, id);
  }
}
