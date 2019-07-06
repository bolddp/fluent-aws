import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { Ec2Instance } from "./Ec2Instance";
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from "../awsapi/AwsApi";

export class Ec2InstanceCollection extends ApiNodeCollection<Ec2Instance, AWS.EC2.Instance> {
  instanceIds?: string[];

  apiNodeFromId(id: string): Ec2Instance {
    return ApiNodeFactory.ec2Instance(this, id);
  }

  apiNodeFromAwsData(data: AWS.EC2.Instance): Ec2Instance {
    return ApiNodeFactory.ec2Instance(this, data.InstanceId, data);
  }

  load(): Promise<AWS.EC2.Instance[]> {
    return AwsApi.ec2.ec2DescribeInstances(this.instanceIds);
  }
}