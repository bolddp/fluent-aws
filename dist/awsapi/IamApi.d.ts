import * as AWS from 'aws-sdk';
export declare class IamApi {
    iam: () => AWS.IAM;
    getRole(name: string): Promise<AWS.IAM.Role>;
    getInstanceProfile(name: string): Promise<AWS.IAM.InstanceProfile>;
}
