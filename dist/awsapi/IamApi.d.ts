import { InstanceProfile, Role } from '@aws-sdk/client-iam';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class IamApi {
    private config;
    private iam;
    constructor(config: FluentAwsConfig);
    getRole(name: string): Promise<Role>;
    getInstanceProfile(name: string): Promise<InstanceProfile>;
}
