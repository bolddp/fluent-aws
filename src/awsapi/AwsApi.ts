import * as AWS from 'aws-sdk';
import { S3Api } from "./S3Api";
import { Ec2Api } from "./Ec2Api";
import { AutoScalingApi } from "./AutoScalingApi";
import { EcsApi } from "./EcsApi";
import { IamApi } from './IamApi';
import { Route53Api } from './Route53Api';

const debug = require('debug')('fluentaws:AwsApi');

/**
 * API for AWS services, using the regular Javascript AWS SDK to wrap requests
 * that are needed by the module.
 */
export class AwsApi {
  static sts: AWS.STS = new AWS.STS();
  static iam: IamApi = new IamApi();
  static s3: S3Api = new S3Api();
  static ec2: Ec2Api = new Ec2Api();
  static ecs: EcsApi = new EcsApi();
  static autoScaling: AutoScalingApi = new AutoScalingApi();
  static route53: Route53Api = new Route53Api();
}