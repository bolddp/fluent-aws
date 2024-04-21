import { SendMessageBatchCommandInput, SendMessageCommandInput } from '@aws-sdk/client-sqs';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class SqsApi {
    private config;
    private sqs;
    constructor(config: FluentAwsConfig);
    listQueueUrls(): Promise<string[]>;
    sendMessage(input: SendMessageCommandInput): Promise<void>;
    sendMessageBatch(input: SendMessageBatchCommandInput): Promise<void>;
}
