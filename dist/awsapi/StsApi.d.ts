import * as AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class StsApi {
    config: FluentAwsConfig;
    sts: () => AWS.STS;
    constructor(config: FluentAwsConfig);
    assumeRole(roleArn: string, sessionName: string, durationSeconds: number): Promise<Credentials>;
}
