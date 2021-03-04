import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { SnsTopic } from './SnsTopic';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
export class SnsTopicCollection extends ApiNodeCollection<SnsTopic, AWS.SNS.Topic> {

  load(): Promise<AWS.SNS.Topic[]> {
    return AwsApi.sns(this.config()).listTopics();
  }

  apiNodeFromAwsData(data: AWS.SNS.Topic): SnsTopic {
    return ApiNodeFactory.snsTopic(this, data.TopicArn)
  }

  apiNodeFromId(id: string): SnsTopic {
    return ApiNodeFactory.snsTopic(this, id);
  }
}