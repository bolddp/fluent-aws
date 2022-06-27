import * as AWS from 'aws-sdk';
import * as fetch from 'node-fetch';
import { S3 } from './s3/S3';
import { Ecs } from './ecs/Ecs';
import { Ec2 } from './ec2/Ec2';
import { PromiseChain } from './node/PromiseChain';
import { ApiNode } from './node/ApiNode';
import { ApiNodeFactory } from './node/ApiNodeFactory';
import { AutoScaling } from './autoScaling/AutoScaling';
import { AwsApi } from './awsapi/AwsApi';
import { Route53 } from './route53/Route53';
import { DynamoDb } from './dynamoDb/DynamoDb';
import { CloudFormation } from './cf/CloudFormation';
import { SystemsManager } from './ssm/SystemsManager';
import { Kms } from './kms/Kms';
import { Cognito } from './cognito/Cognito';
import { Sns } from './sns/Sns';
import { FluentAwsConfig } from './FluentAwsConfig';

(<any>global)['fetch'] = fetch;

const debug = require('debug')('fluentaws:FluentAws');

export class FluentAws extends ApiNode {
  configInstance: FluentAwsConfig = {};
  promiseChain = new PromiseChain();
  assumeRolePromise: () => Promise<void>;

  constructor() {
    super(undefined);
  }

  async sdk<T>(fnc: (aws: typeof AWS, cfg: FluentAwsConfig) => T): Promise<T> {
    await this.ensureResolved();
    return fnc(AWS, this.configInstance);
  }

  config(): FluentAwsConfig {
    return this.configInstance;
  }

  /**
   * Reference to the AWS SDK instance that FluentAws uses. This reference can be used to access the
   * raw AWS SDK, honoring the configuration that you have performed through the FluentAws API and
   * allowing for mixing AWS API calls through FluentAws and the raw AWS SDK.
   */

  region(region: string): FluentAws {
    debug('setting region: %s', region);
    this.configInstance = {
      ...this.configInstance,
      region,
    };
    return this;
  }

  profile(profile: string): FluentAws {
    debug('setting profile: %s', profile);
    this.configInstance = {
      ...this.configInstance,
      credentials: new AWS.SharedIniFileCredentials({ profile }),
    };
    return this;
  }

  credentials(accessKeyId: string, secretAccessKey: string): FluentAws {
    debug('setting credentials');
    this.configInstance = {
      ...this.configInstance,
      credentials: new AWS.Credentials({ accessKeyId, secretAccessKey }),
    };
    return this;
  }

  /**
   * Makes sure that the FluentAws instance assumes a role before attempting to access AWS resources.
   * The command can be repeated periodically to ensure that the assumed role doesn't expire.
   */
  assumeRole(
    roleArn: string,
    sessionName: string,
    durationSeconds?: number
  ): FluentAws {
    this.assumeRolePromise = this.promiseChain.replace(
      this.assumeRolePromise,
      async () => {
        const credentials = await AwsApi.sts(this.config()).assumeRole(
          roleArn,
          sessionName,
          durationSeconds ?? 3600
        );
        this.configInstance = { ...this.configInstance, credentials };
      }
    );
    return this;
  }

  /**
   * Makes the FluentAws instance assume a chain of roles before attempting to access AWS resources.
   */
  assumeRoles(
    roleArns: string[],
    sessionNamePrefix: string,
    durationSeconds?: number
  ): FluentAws {
    this.assumeRolePromise = this.promiseChain.replace(
      this.assumeRolePromise,
      async () => {
        let index = 1;
        for (const arn of roleArns) {
          const credentials = await AwsApi.sts(this.config()).assumeRole(
            arn,
            `${sessionNamePrefix}-${index}`,
            durationSeconds ?? 3600
          );
          this.configInstance = { ...this.configInstance, credentials };
          index += 1;
        }
      }
    );
    return this;
  }

  autoScaling(): AutoScaling {
    return ApiNodeFactory.autoScaling(this);
  }
  cloudFormation(): CloudFormation {
    return ApiNodeFactory.cloudFormation(this);
  }
  cognito(): Cognito {
    return ApiNodeFactory.cognito(this);
  }
  dynamoDb(): DynamoDb {
    return ApiNodeFactory.dynamoDb(this);
  }
  ecs(): Ecs {
    return ApiNodeFactory.ecs(this);
  }
  ec2(): Ec2 {
    return ApiNodeFactory.ec2(this);
  }
  kms(): Kms {
    return ApiNodeFactory.kms(this);
  }
  route53(): Route53 {
    return ApiNodeFactory.route53(this);
  }
  s3(): S3 {
    return ApiNodeFactory.s3(this);
  }
  sns(): Sns {
    return ApiNodeFactory.sns(this);
  }
  systemsManager(): SystemsManager {
    return ApiNodeFactory.systemsManager(this);
  }
}

const fluentAwsInstances = new Map<string, FluentAws>();

export function aws(name?: string): FluentAws {
  const instanceName = name || 'default';
  let instance = fluentAwsInstances.get(instanceName);
  if (!instance) {
    debug('creating instance: %s', instanceName);
    instance = new FluentAws();
    fluentAwsInstances.set(instanceName, instance);
  }
  return instance;
}
