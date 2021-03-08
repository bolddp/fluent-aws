import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:SnsApi');

export class SnsApi {
  config: FluentAwsConfig;
  sns = () => new AWS.SNS(this.config);

  constructor(config: FluentAwsConfig) {
    this.config = config;
  }

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