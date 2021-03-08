import * as AWS from 'aws-sdk';
import { S3 } from './s3/S3';
import { Ecs } from './ecs/Ecs';
import { Ec2 } from './ec2/Ec2';
import { PromiseChain } from './node/PromiseChain';
import { ApiNode } from './node/ApiNode';
import { AutoScaling } from './autoScaling/AutoScaling';
import { Route53 } from './route53/Route53';
import { DynamoDb } from "./dynamoDb/DynamoDb";
import { CloudFormation } from "./cf/CloudFormation";
import { SystemsManager } from "./ssm/SystemsManager";
import { Kms } from './kms/Kms';
import { Cognito } from './cognito/Cognito';
import { Sns } from './sns/Sns';
import { FluentAwsConfig } from './FluentAwsConfig';
export declare class FluentAws extends ApiNode {
    configInstance: FluentAwsConfig;
    promiseChain: PromiseChain;
    assumeRolePromise: () => Promise<void>;
    constructor();
    sdk<T>(fnc: (aws: typeof AWS, cfg: FluentAwsConfig) => T): Promise<T>;
    config(): FluentAwsConfig;
    /**
     * Reference to the AWS SDK instance that FluentAws uses. This reference can be used to access the
     * raw AWS SDK, honoring the configuration that you have performed through the FluentAws API and
     * allowing for mixing AWS API calls through FluentAws and the raw AWS SDK.
     */
    region(region: string): FluentAws;
    profile(profile: string): FluentAws;
    credentials(accessKeyId: string, secretAccessKey: string): FluentAws;
    /**
     * Makes sure that the FluentAws instance assumes a role before attempting to access AWS resources.
     * The command can be repeated periodically to ensure that the assumed role doesn't expire.
     */
    assumeRole(roleArn: string, sessionName: string): FluentAws;
    /**
     * Makes the FluentAws instance assume a chain of roles before attempting to access AWS resources.
     */
    assumeRoles(roleArns: string[], sessionNamePrefix: string): FluentAws;
    autoScaling(): AutoScaling;
    cloudFormation(): CloudFormation;
    cognito(): Cognito;
    dynamoDb(): DynamoDb;
    ecs(): Ecs;
    ec2(): Ec2;
    kms(): Kms;
    route53(): Route53;
    s3(): S3;
    sns(): Sns;
    systemsManager(): SystemsManager;
}
export declare function aws(name?: string): FluentAws;
