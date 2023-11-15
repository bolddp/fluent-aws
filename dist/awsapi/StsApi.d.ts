import { AwsCredentialIdentity } from '@aws-sdk/types';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class StsApi {
    private config;
    private sts;
    constructor(config: FluentAwsConfig);
    assumeRole(roleArn: string, sessionName: string, durationSeconds: number): Promise<AwsCredentialIdentity>;
}
