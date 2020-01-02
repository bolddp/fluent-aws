import * as AWS from 'aws-sdk';
export declare class StsApi {
    sts: () => AWS.STS;
    assumeRole(roleArn: string, sessionName: string): Promise<void>;
}
