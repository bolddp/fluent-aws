import * as AWS from 'aws-sdk';
import { ApiNode } from "../node/ApiNode";
import { Ec2InstanceCollection } from '../ec2/Ec2InstanceCollection';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';

/**
 * Representation of an AWS Autoscaling group.
 */
export class AutoScalingGroup extends AwsDataApiNode<AWS.AutoScaling.AutoScalingGroup> {
  name: string;
  ec2InstanceCollection: Ec2InstanceCollection;

  constructor(parent: ApiNode, name: string) {
    super(parent);
    this.name = name;
  }

  loadAwsData() {
    return AwsApi.autoScaling(this.config()).describeGroup(this.name);
  }

  ec2Instances(): Ec2InstanceCollection {
    if (!this.ec2InstanceCollection) {
      this.ec2InstanceCollection = ApiNodeFactory.ec2InstanceCollection(this);
      // Promise to determine the id's of all instances in the autoscaling group
      this.promiseChain.addVolatile(async () => {
        const awsData = await this.loadAwsData();
        this.ec2InstanceCollection.instanceIds = awsData.Instances.map(x => x.InstanceId);
      });
    }
    return this.ec2InstanceCollection;
  }

  async updateSize(minSize: number, maxSize: number, desiredSize: number): Promise<void> {
    await this.ensureResolved();
    return AwsApi.autoScaling(this.config()).update({
      AutoScalingGroupName: this.name,
      MinSize: minSize,
      MaxSize: maxSize,
      DesiredCapacity: desiredSize
    });
  }

  async setInstanceProtection(instanceIds: string[], value: boolean): Promise<void> {
    await this.ensureResolved();
    return AwsApi.autoScaling(this.config()).setInstanceProtection(this.name, instanceIds, value);
  }
}