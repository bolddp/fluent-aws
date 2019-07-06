import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from "./FluentAwsConfig";
import { S3 } from './s3/S3';
import { Ecs } from './ecs/Ecs';
import { Ec2 } from './ec2/Ec2';
import { PromiseChain } from './node/PromiseChain';
import { ApiNode } from './node/ApiNode';
import { ApiNodeFactory } from './node/ApiNodeFactory';
import { AutoScaling } from './autoScaling/AutoScaling';
import { AwsApi } from './awsapi/AwsApi';
import { Route53 } from './route53/Route53';

const debug = require('debug')('fluentaws:FluentAws');

export class FluentAws extends ApiNode {
  promiseChain = new PromiseChain();
  s3Instance: S3;
  ecsInstance: Ecs;
  ec2Instance: Ec2;
  autoScalingInstance: AutoScaling;
  route53Instance: Route53;

  constructor() {
    super(undefined);
    this.s3Instance = ApiNodeFactory.s3(this);;
    this.ecsInstance = ApiNodeFactory.ecs(this);
    this.ec2Instance = ApiNodeFactory.ec2(this);
    this.autoScalingInstance = ApiNodeFactory.autoScaling(this);
    this.route53Instance = ApiNodeFactory.route53(this);
  }

  configure(config: FluentAwsConfig): FluentAws {
    this.promiseChain.addVolatile(async () => {
      const fluentAwsConfig = {
        region: config.region
      };
      debug('applying configuration: %j', fluentAwsConfig);
      AWS.config.update(fluentAwsConfig);
    });
    return this;
  }

  profile(profile: string): FluentAws {
    this.promiseChain.add(async () => {
      debug('applying profile: %s', profile);
      var credentials = new AWS.SharedIniFileCredentials({ profile });
      AWS.config.credentials = credentials;
    });
    return this;
  }

  assumeRole(roleArn: string, sessionName: string): FluentAws {
    this.promiseChain.add(async () => {
        debug('assuming role: %s, session name: %s', roleArn, sessionName);
        try {
          const params = {
            DurationSeconds: 3600,
            ExternalId: sessionName,
            RoleArn: roleArn,
            RoleSessionName: sessionName
          };

          const assumed = await AwsApi.sts.assumeRole(params).promise();
          AWS.config.update({
            accessKeyId: assumed.Credentials.AccessKeyId,
            secretAccessKey: assumed.Credentials.SecretAccessKey,
            sessionToken: assumed.Credentials.SessionToken
          });
          debug('assumed role: %s, session name: %s', roleArn, sessionName);
        } catch (error) {
          throw new Error(`could not assume role: ${roleArn}, message: ${error.message}`);
        }
      }
    );
    return this;
  }

  autoScaling(): AutoScaling { return this.autoScalingInstance; }

  s3(): S3 { return this.s3Instance; }

  ecs(): Ecs { return this.ecsInstance; }

  ec2(): Ec2 { return this.ec2Instance; }

  route53(): Route53 { return this.route53Instance; }

  async resolve(): Promise<FluentAws> {
    await this.promiseChain.resolve();
    return this;
  }

  async resolveParent(): Promise<void> {
    await this.promiseChain.resolve();
  }
}

const fluentAwsInstances = new Map<string, FluentAws>();

export function aws(name?: string): FluentAws {
  const instanceName = name || 'default';
  let instance = fluentAwsInstances.get(instanceName);
  if (!instance) {
    instance = new FluentAws();
    fluentAwsInstances.set(instanceName, instance);
  }
  return instance;
}