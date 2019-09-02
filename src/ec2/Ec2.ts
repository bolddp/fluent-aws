import { Ec2AccountAttributes } from './Ec2AccountAttributes';
import { Ec2AccountAttributesMapper } from './Ec2AccountAttributes';
import { AwsApi } from './../awsapi/AwsApi';
import { Ec2Instance } from "./Ec2Instance";
import { ApiNode } from "../node/ApiNode";
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { Ec2InstanceCollection } from "./Ec2InstanceCollection";

export class Ec2 extends ApiNode {
  instanceCollection: Ec2InstanceCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.instanceCollection = ApiNodeFactory.ec2InstanceCollection(this);
  }

  instances(): Ec2InstanceCollection {
    return this.instanceCollection;
  }

  instance(id: string): Ec2Instance {
    return this.instanceCollection.getById(id);
  }

  async accountAttributes(): Promise<Ec2AccountAttributes> {
    await this.ensureResolved();
    const awsData = await AwsApi.ec2.describeAccountAttributes();
    return Ec2AccountAttributesMapper.fromAwsData(awsData);
  }
}