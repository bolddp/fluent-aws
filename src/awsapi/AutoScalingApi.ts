import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:AutoScalingApi');

export class AutoScalingApi {
  autoScaling = () => new AWS.AutoScaling();

  async describeGroups(idOrArns?: string[]): Promise<AWS.AutoScaling.AutoScalingGroup[]> {
    debug('describing auto scaling groups: %j', idOrArns || {});
    const response = await this.autoScaling().describeAutoScalingGroups({
      AutoScalingGroupNames: idOrArns
    }).promise();
    debug('described auto scaling groups');
    return response.AutoScalingGroups;
  }

  async describeGroup(idOrArn: string): Promise<AWS.AutoScaling.AutoScalingGroup> {
    const autoScalingGroups = await this.describeGroups([idOrArn]);
    if (autoScalingGroups.length == 0) {
      throw new Error(`autoscaling group not found: ${idOrArn}`);
    }
    return autoScalingGroups[0];
  }

  async update(updateData: AWS.AutoScaling.UpdateAutoScalingGroupType): Promise<void> {
    await this.autoScaling().updateAutoScalingGroup(updateData).promise();
  }

  async setInstanceProtection(idOrArn: string, instanceIds: string[], value: boolean): Promise<void> {
    debug('setting instance proection: %s, instances: %j, value: %b', idOrArn, instanceIds, value);
    await this.autoScaling().setInstanceProtection({
      AutoScalingGroupName: idOrArn,
      InstanceIds: instanceIds,
      ProtectedFromScaleIn: value
    }).promise();
    debug('set instance protection');
  }

}