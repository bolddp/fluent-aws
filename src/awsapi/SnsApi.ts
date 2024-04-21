import { PublishInput, SNS, Topic } from '@aws-sdk/client-sns';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:SnsApi');

export class SnsApi {
  private sns = () => new SNS(this.config);

  constructor(private config: FluentAwsConfig) {}

  async listTopics(): Promise<Topic[]> {
    debug('listing topics');
    const response = await this.sns().listTopics({});
    debug('listed topics');
    return response.Topics;
  }

  async publish(input: PublishInput): Promise<void> {
    debug('publishing: %j', input);
    const response = await this.sns().publish(input);
    debug('published');
  }
}
