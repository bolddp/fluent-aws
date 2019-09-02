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

export class FluentAws extends ApiNode {
  promiseChain = new PromiseChain();
  s3Instance: S3;
  ecsInstance: Ecs;
  ec2Instance: Ec2;
  autoScalingInstance: AutoScaling;
  route53Instance: Route53;
  dynamoDbInstance: DynamoDb;

  constructor() {
    super(undefined);
    this.s3Instance = ApiNodeFactory.s3(this);;
    this.ecsInstance = ApiNodeFactory.ecs(this);
    this.ec2Instance = ApiNodeFactory.ec2(this);
    this.autoScalingInstance = ApiNodeFactory.autoScaling(this);
    this.route53Instance = ApiNodeFactory.route53(this);
    this.dynamoDbInstance = ApiNodeFactory.dynamoDb(this);
  }

  configure(config: FluentAwsConfig): FluentAws {
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
  s3(): S3 { return this.s3Instance; }
  ecs(): Ecs { return this.ecsInstance; }
  ec2(): Ec2 { return this.ec2Instance; }
  route53(): Route53 { return this.route53Instance; }
  dynamoDb(): DynamoDb { return this.dynamoDbInstance; }
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