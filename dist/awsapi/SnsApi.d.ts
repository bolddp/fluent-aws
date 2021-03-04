import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class SnsApi {
    config: FluentAwsConfig;
    sns: () => AWS.SNS;
    constructor(config: FluentAwsConfig);
    listTopics(): Promise<AWS.SNS.Topic[]>;
    publish(input: AWS.SNS.PublishInput): Promise<void>;
}
