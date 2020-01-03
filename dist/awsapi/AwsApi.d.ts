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
    static autoScaling: AutoScalingApi;
    static cloudFormation: CloudFormationApi;
    static cognito: CognitoApi;
    static dynamoDb: DynamoDbApi;
    static ec2: Ec2Api;
    static ecs: EcsApi;
    static iam: IamApi;
    static kms: KmsApi;
    static route53: Route53Api;
    static s3: S3Api;
    static sns: SnsApi;
    static sts: StsApi;
    static systemsManager: SystemsManagerApi;
    static configure: (config: FluentAwsConfig) => void;
    static profile: (profile: string) => void;
    static assumeRole: (roleArn: string, sessionName: string) => Promise<void>;
}
