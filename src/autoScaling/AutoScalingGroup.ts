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
  constructor(parent: ApiNode, name: string, awsData: AWS.AutoScaling.AutoScalingGroup) {
    super(parent, awsData);
    this.name = name;
    this.ec2InstanceCollection = ApiNodeFactory.ec2InstanceCollection(this);
  }

  loadAwsData() {
    return AwsApi.autoScaling.describeGroup(this.name);
  }

  ec2Instances(): Ec2InstanceCollection {
    // Promise to determine the id's of all instances in the autoscaling group
    this.promiseChain.add(async () => {
      const awsData = await this.loadAwsData();
      this.ec2InstanceCollection.instanceIds = awsData.Instances.map(x => x.InstanceId);
    });
    return this.ec2InstanceCollection;
  }

  async resolve(): Promise<AutoScalingGroup> {
    await this.resolveNode();
    return this;
  }
}