import {
  SQS,
  SendMessageBatchCommandInput,
  SendMessageCommandInput,
} from '@aws-sdk/client-sqs';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:SnsApi');

export class SqsApi {
  private sqs = () => new SQS(this.config);

  constructor(private config: FluentAwsConfig) {}

  async listQueueUrls(): Promise<string[]> {
    debug('listing queues');
    const response = await this.sqs().listQueues({});
    debug('listed queues');
    return response.QueueUrls;
  }

  async sendMessage(input: SendMessageCommandInput): Promise<void> {
    debug('send message: %j', input);
    const response = await this.sqs().sendMessage(input);
    debug('sent message');
  }

  async sendMessageBatch(input: SendMessageBatchCommandInput): Promise<void> {
    debug('send message batch: %j', input);
    const response = await this.sqs().sendMessageBatch(input);
    debug('sent message batch');
  }
}
