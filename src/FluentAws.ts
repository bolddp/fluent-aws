import * as AWS from 'aws-sdk';
import * as fetch from 'node-fetch';
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
import { DynamoDb } from "./dynamoDb/DynamoDb";
import { CloudFormation } from "./cf/CloudFormation";
import { SystemsManager } from "./ssm/SystemsManager";
import { Kms } from './kms/Kms';
import { Cognito } from './cognito/Cognito';
import { Sns } from './sns/Sns';

(<any> global)['fetch'] = fetch;

export class FluentAws extends ApiNode {
  config: FluentAwsConfig;
  promiseChain = new PromiseChain();

  autoScalingInstance: AutoScaling;
  cloudFormationInstance: CloudFormation;
  cognitoInstance: Cognito;
  dynamoDbInstance: DynamoDb;
  ec2Instance: Ec2;
  ecsInstance: Ecs;
  kmsInstance: Kms;
  route53Instance: Route53;
  s3Instance: S3;
  snsInstance: Sns;
  systemsManagerInstance: SystemsManager;

  constructor() {
    super(undefined);
    this.autoScalingInstance = ApiNodeFactory.autoScaling(this);
    this.cloudFormationInstance = ApiNodeFactory.cloudFormation(this);
    this.cognitoInstance = ApiNodeFactory.cognito(this);
    this.dynamoDbInstance = ApiNodeFactory.dynamoDb(this);
    this.ecsInstance = ApiNodeFactory.ecs(this);
    this.ec2Instance = ApiNodeFactory.ec2(this);
    this.kmsInstance = ApiNodeFactory.kms(this);
    this.route53Instance = ApiNodeFactory.route53(this);
    this.s3Instance = ApiNodeFactory.s3(this);
    this.snsInstance = ApiNodeFactory.sns(this);
    this.systemsManagerInstance = ApiNodeFactory.systemsManager(this);
  }

  async sdk(): Promise<typeof AWS> {
    await this.ensureResolved();
    return AWS;
  }

  /**
   * Reference to the AWS SDK instance that FluentAws uses. This reference can be used to access the
   * raw AWS SDK, honoring the configuration that you have performed through the FluentAws API and
   * allowing for mixing AWS API calls through FluentAws and the raw AWS SDK.
   */

  configure(config: FluentAwsConfig): FluentAws {
    this.config = config;
    this.promiseChain.addVolatile(async () => {
      const fluentAwsConfig = {
        region: config.region
      };
      AwsApi.configure(fluentAwsConfig);
    });
    return this;
  }

  profile(profile: string): FluentAws {
    this.promiseChain.add(async () => {
      AwsApi.profile(profile);
    });
    return this;
  }

  assumeRole(roleArn: string, sessionName: string): FluentAws {
    this.promiseChain.add(() => AwsApi.assumeRole(roleArn, sessionName));
    return this;
  }

  autoScaling(): AutoScaling { return this.autoScalingInstance; }
  cloudFormation(): CloudFormation { return this.cloudFormationInstance; }
  cognito(): Cognito { return this.cognitoInstance; }
  dynamoDb(): DynamoDb { return this.dynamoDbInstance; }
  ecs(): Ecs { return this.ecsInstance; }
  ec2(): Ec2 { return this.ec2Instance; }
  kms(): Kms { return this.kmsInstance; }
  route53(): Route53 { return this.route53Instance; }
  s3(): S3 { return this.s3Instance; }
  sns(): Sns { return this.snsInstance; }
  systemsManager(): SystemsManager { return this.systemsManagerInstance; }
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