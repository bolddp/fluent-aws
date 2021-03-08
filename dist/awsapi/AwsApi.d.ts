import { SystemsManagerApi } from './SystemsManagerApi';
import { CloudFormationApi } from './CloudFormationApi';
import { S3Api } from "./S3Api";
import { Ec2Api } from "./Ec2Api";
import { AutoScalingApi } from "./AutoScalingApi";
import { EcsApi } from "./EcsApi";
import { IamApi } from './IamApi';
import { Route53Api } from './Route53Api';
import { FluentAwsConfig } from '../FluentAwsConfig';
import { DynamoDbApi } from './DynamoDbApi';
import { StsApi } from './StsApi';
import { KmsApi } from './KmsApi';
import { CognitoApi } from './CognitoApi';
import { SnsApi } from './SnsApi';
/**
 * API for AWS services, using the regular Javascript AWS SDK to wrap requests
 * that are needed by the module.
 */
export declare class AwsApi {
    static autoScaling: (config: FluentAwsConfig) => AutoScalingApi;
    static cloudFormation: (config: FluentAwsConfig) => CloudFormationApi;
    static cognito: (config: FluentAwsConfig) => CognitoApi;
    static dynamoDb: (config: FluentAwsConfig) => DynamoDbApi;
    static ec2: (config: FluentAwsConfig) => Ec2Api;
    static ecs: (config: FluentAwsConfig) => EcsApi;
    static iam: (config: FluentAwsConfig) => IamApi;
    static kms: (config: FluentAwsConfig) => KmsApi;
    static route53: (config: FluentAwsConfig) => Route53Api;
    static s3: (config: FluentAwsConfig) => S3Api;
    static sns: (config: FluentAwsConfig) => SnsApi;
    static sts: (config: FluentAwsConfig) => StsApi;
    static systemsManager: (config: FluentAwsConfig) => SystemsManagerApi;
}
