import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:SnsApi');

export class SnsApi {
  sns = () => new AWS.SNS();

  async listTopics(): Promise<AWS.SNS.Topic[]> {
    debug('listing topics');
    const response = await this.sns().listTopics().promise();
    debug('listed topics');
    return response.Topics;
  }

  async publish(input: AWS.SNS.PublishInput): Promise<void> {
    debug('publishing: %j', input);
    const response = await this.sns().publish(input).promise();
    debug('published');
  }
}