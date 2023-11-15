import {
  AutoScaling,
  AutoScalingGroup,
  UpdateAutoScalingGroupType,
} from '@aws-sdk/client-auto-scaling';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:AutoScalingApi');

export class AutoScalingApi {
  private autoScaling = () => new AutoScaling(this.config);

  constructor(private config: FluentAwsConfig) {}

  async describeGroups(idOrArns?: string[]): Promise<AutoScalingGroup[]> {
    debug('describing auto scaling groups: %j', idOrArns || {});
    const response = await this.autoScaling().describeAutoScalingGroups({
      AutoScalingGroupNames: idOrArns,
    });
    debug('described auto scaling groups');
    return response.AutoScalingGroups;
  }

  async describeGroup(idOrArn: string): Promise<AutoScalingGroup> {
    const autoScalingGroups = await this.describeGroups([idOrArn]);
    if (autoScalingGroups.length == 0) {
      throw new Error(`autoscaling group not found: ${idOrArn}`);
    }
    return autoScalingGroups[0];
  }

  async update(updateData: UpdateAutoScalingGroupType): Promise<void> {
    await this.autoScaling().updateAutoScalingGroup(updateData);
  }

  async setInstanceProtection(
    idOrArn: string,
    instanceIds: string[],
    value: boolean
  ): Promise<void> {
    debug(
      'setting instance proection: %s, instances: %j, value: %b',
      idOrArn,
      instanceIds,
      value
    );
    await this.autoScaling().setInstanceProtection({
      AutoScalingGroupName: idOrArn,
      InstanceIds: instanceIds,
      ProtectedFromScaleIn: value,
    });
    debug('set instance protection');
  }
}
