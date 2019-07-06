import * as AWS from 'aws-sdk';
import { EcsCluster } from './EcsCluster';
import { Ec2Instance } from '../ec2/Ec2Instance';
import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';

export class EcsTask extends AwsDataApiNode<AWS.ECS.Task> {
  cluster: EcsCluster;
  idOrArn: string;
  ec2InstanceInstance: Ec2Instance;

  constructor(parent: ApiNode, cluster: EcsCluster, idOrArn: string, awsData?: AWS.ECS.Task) {
    super(parent, awsData);
    this.cluster = cluster;
    this.idOrArn = idOrArn;
  }

  loadAwsData() {
    return AwsApi.ecs.describeTask(this.cluster.idOrArn, this.idOrArn);
  }

  /**
   * The EC2 instance that this task runs on.
   */
  ec2Instance(): Ec2Instance {
    this.ec2InstanceInstance = ApiNodeFactory.ec2Instance(this, undefined);
    // We add a promise that will look up the EC2 instance id and feed it to the Ec2Instance
    this.promiseChain.add(async () => {
      const awsData = await this.loadAwsData();
      const containerInstance = await AwsApi.ecs.describeContainerInstance(this.cluster.idOrArn, awsData.containerInstanceArn);
      this.ec2InstanceInstance.instanceId = containerInstance.ec2InstanceId;
    });
    return this.ec2InstanceInstance;
  }

  async resolve(): Promise<EcsTask> {
    await this.resolveNode();
    return this;
  }
}