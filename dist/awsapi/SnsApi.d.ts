import { PublishInput, Topic } from '@aws-sdk/client-sns';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class SnsApi {
    private config;
    private sns;
    constructor(config: FluentAwsConfig);
    listTopics(): Promise<Topic[]>;
    publish(input: PublishInput): Promise<void>;
}
