import * as AWS from 'aws-sdk';
import { Ec2Instance } from '../ec2/Ec2Instance';
import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';

export class EcsTask extends AwsDataApiNode<AWS.ECS.Task> {
  clusterId: string;
  idOrArn: string;
  ec2InstanceInstance: Ec2Instance;

  constructor(parent: ApiNode, clusterId: string, idOrArn: string, awsData?: AWS.ECS.Task) {
    super(parent, awsData);
    this.clusterId = clusterId;
    this.idOrArn = idOrArn;
  }

  loadAwsData() {
    return AwsApi.ecs.describeTask(this.clusterId, this.idOrArn);
  }

  /**
   * The EC2 instance that this task runs on.
   */
  ec2Instance(): Ec2Instance {
    if (!this.ec2InstanceInstance) {
      this.ec2InstanceInstance = ApiNodeFactory.ec2Instance(this, undefined);
      // We add a promise that will look up the EC2 instance id and feed it to the Ec2Instance
      this.promiseChain.add(async () => {
        const awsData = await this.loadAwsData();
        const containerInstance = await AwsApi.ecs.describeContainerInstance(this.clusterId, awsData.containerInstanceArn);
        this.ec2InstanceInstance.instanceId = containerInstance.ec2InstanceId;
      });
    }
    return this.ec2InstanceInstance;
  }
}