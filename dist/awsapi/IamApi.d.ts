import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class IamApi {
    config: FluentAwsConfig;
    iam: () => AWS.IAM;
    constructor(config: FluentAwsConfig);
    getRole(name: string): Promise<AWS.IAM.Role>;
    getInstanceProfile(name: string): Promise<AWS.IAM.InstanceProfile>;
}
