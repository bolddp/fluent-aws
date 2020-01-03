import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';

export class SnsTopic extends ApiNode {
  arn: string;

  constructor(parent: ApiNode, arn: string) {
    super(parent);
    this.arn = arn;
  }

  async publishJson(obj: any): Promise<void> {
    await this.ensureResolved();
    await AwsApi.sns.publish({
      TopicArn: this.arn,
      Message: JSON.stringify(obj)
    });
  }
}