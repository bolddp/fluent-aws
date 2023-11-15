import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { Ec2Instance } from './Ec2Instance';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { Instance } from '@aws-sdk/client-ec2';

export class Ec2InstanceCollection extends ApiNodeCollection<
  Ec2Instance,
  Instance
> {
  instanceIds?: string[];

  apiNodeFromId(id: string): Ec2Instance {
    return ApiNodeFactory.ec2Instance(this, id);
  }

  apiNodeFromAwsData(data: Instance): Ec2Instance {
    return ApiNodeFactory.ec2Instance(this, data.InstanceId);
  }

  load(): Promise<Instance[]> {
    return AwsApi.ec2(this.config()).describeInstances(this.instanceIds);
  }
}
