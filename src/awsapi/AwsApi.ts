import { SystemsManagerApi } from './SystemsManagerApi';
import { CloudFormationApi } from './CloudFormationApi';
import * as AWS from 'aws-sdk';
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

const debug = require('debug')('fluentaws:AwsApi');

/**
 * API for AWS services, using the regular Javascript AWS SDK to wrap requests
 * that are needed by the module.
 */
export class AwsApi {
  static autoScaling: AutoScalingApi = new AutoScalingApi();
  static cloudFormation: CloudFormationApi = new CloudFormationApi();
  static cognito: CognitoApi = new CognitoApi();
  static dynamoDb: DynamoDbApi = new DynamoDbApi();
  static ec2: Ec2Api = new Ec2Api();
  static ecs: EcsApi = new EcsApi();
  static iam: IamApi = new IamApi();
  static kms: KmsApi = new KmsApi();
  static route53: Route53Api = new Route53Api();
  static s3: S3Api = new S3Api();
  static sts: StsApi = new StsApi();
  static systemsManager: SystemsManagerApi = new SystemsManagerApi();

  static configure = (config: FluentAwsConfig): void => {
    debug('applying configuration: %j', config);
    AWS.config.update(config);
  };

  static profile = (profile: string): void => {
    debug('applying profile: %s', profile);
    var credentials = new AWS.SharedIniFileCredentials({ profile });
    AWS.config.credentials = credentials;
  }

  static assumeRole = async (roleArn: string, sessionName: string): Promise<void> => {
    debug('assuming role: %s, session name: %s', roleArn, sessionName);
    await AwsApi.sts.assumeRole(roleArn, sessionName);
    debug('assumed role: %s, session name: %s', roleArn, sessionName);
  }
}