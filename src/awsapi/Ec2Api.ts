import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:Ec2Api');

export class Ec2Api {
  config: FluentAwsConfig;
  ec2 = () => new AWS.EC2(this.config);

  constructor(config: FluentAwsConfig) {
    this.config = config;
  }

  async describeInstances(instanceIds?: string[]): Promise<AWS.EC2.Instance[]> {
    debug('describing instances: %j', instanceIds || {});
    const response = await this.ec2().describeInstances({
      InstanceIds: instanceIds
    }).promise();
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
  async describeInstance(instanceId: string): Promise<AWS.EC2.Instance> {
    const instances = await this.describeInstances([instanceId]);
    if (instances.length == 0) {
      throw new Error(`Instance not found: ${instanceId}`);
    }
    return instances[0];
  }

  async describeAccountAttributes(): Promise<AWS.EC2.AccountAttributeList> {
    debug('describing account attributes');
    const response = await this.ec2().describeAccountAttributes().promise();
    debug('described account attributes');
    return response.AccountAttributes;
  }
}