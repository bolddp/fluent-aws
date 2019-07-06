import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:Ec2Api');

export class Ec2Api {
  ec2 = () => new AWS.EC2();

  async ec2DescribeInstances(instanceIds?: string[]): Promise<AWS.EC2.Instance[]> {
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
  async ec2DescribeInstance(instanceId: string): Promise<AWS.EC2.Instance> {
    const instances = await this.ec2DescribeInstances([instanceId]);
    if (instances.length == 0) {
      throw new Error(`instance not found: ${instanceId}`);
    }
    return instances[0];
  }


}