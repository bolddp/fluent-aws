import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { SnsTopic } from './SnsTopic';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { Topic } from '@aws-sdk/client-sns';
export class SnsTopicCollection extends ApiNodeCollection<SnsTopic, Topic> {
  load(): Promise<Topic[]> {
    return AwsApi.sns(this.config()).listTopics();
  }

  apiNodeFromAwsData(data: Topic): SnsTopic {
    return ApiNodeFactory.snsTopic(this, data.TopicArn);
  }

  apiNodeFromId(id: string): SnsTopic {
    return ApiNodeFactory.snsTopic(this, id);
  }
}
