import { AccountAttribute, EC2, Instance } from '@aws-sdk/client-ec2';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:Ec2Api');

export class Ec2Api {
  private ec2 = () => new EC2(this.config);

  constructor(private config: FluentAwsConfig) {}

  async describeInstances(instanceIds?: string[]): Promise<Instance[]> {
    debug('describing instances: %j', instanceIds || {});
    const response = await this.ec2().describeInstances({
      InstanceIds: instanceIds,
    });
    const result = [];
    for (const res of response.Reservations) {
      for (const ins of res.Instances) {
        result.push(ins);
      }
    }
    debug('described instances');
    return result;
  }

  /**
   * Loads AWS information about one EC2 instance. If the instance is not found,
   * an error is thrown.
   */
  async describeInstance(instanceId: string): Promise<Instance> {
    const instances = await this.describeInstances([instanceId]);
    if (instances.length == 0) {
      throw new Error(`Instance not found: ${instanceId}`);
    }
    return instances[0];
  }

  async describeAccountAttributes(): Promise<AccountAttribute[]> {
    debug('describing account attributes');
    const response = await this.ec2().describeAccountAttributes({});
    debug('described account attributes');
    return response.AccountAttributes;
  }
}
