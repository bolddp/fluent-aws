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

const debug = require('debug')('fluentaws:AwsApi');

/**
 * API for AWS services, using the regular Javascript AWS SDK to wrap requests
 * that are needed by the module.
 */
export class AwsApi {
  static autoScaling = (config: FluentAwsConfig): AutoScalingApi => new AutoScalingApi(config);
  static cloudFormation = (config: FluentAwsConfig): CloudFormationApi => new CloudFormationApi(config);
  static cognito = (config: FluentAwsConfig): CognitoApi => new CognitoApi(config);
  static dynamoDb = (config: FluentAwsConfig): DynamoDbApi => new DynamoDbApi(config);
  static ec2 = (config: FluentAwsConfig): Ec2Api => new Ec2Api(config);
  static ecs = (config: FluentAwsConfig): EcsApi => new EcsApi(config);
  static iam = (config: FluentAwsConfig): IamApi => new IamApi(config);
  static kms = (config: FluentAwsConfig): KmsApi => new KmsApi(config);
  static route53 = (config: FluentAwsConfig): Route53Api => new Route53Api(config);
  static s3 = (config: FluentAwsConfig): S3Api => new S3Api(config);
  static sns = (config: FluentAwsConfig): SnsApi => new SnsApi(config);
  static sts = (config: FluentAwsConfig): StsApi => new StsApi(config);
  static systemsManager = (config: FluentAwsConfig): SystemsManagerApi => new SystemsManagerApi(config);
}