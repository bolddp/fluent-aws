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

const debug = require('debug')('fluentaws:AwsApi');

/**
 * API for AWS services, using the regular Javascript AWS SDK to wrap requests
 * that are needed by the module.
 */
export class AwsApi {
  static sts: StsApi = new StsApi();
  static iam: IamApi = new IamApi();
  static s3: S3Api = new S3Api();
  static ec2: Ec2Api = new Ec2Api();
  static ecs: EcsApi = new EcsApi();
  static autoScaling: AutoScalingApi = new AutoScalingApi();
  static route53: Route53Api = new Route53Api();
  static dynamoDb: DynamoDbApi = new DynamoDbApi();

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