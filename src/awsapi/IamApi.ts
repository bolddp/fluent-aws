import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:IamApi');

export class IamApi {
  config: FluentAwsConfig;
  iam = () => new AWS.IAM(this.config);

  constructor(config: FluentAwsConfig) {
    this.config = config;
  }

  async getRole(name: string): Promise<AWS.IAM.Role> {
    debug('getting role: %s', name);
    const response = await this.iam().getRole({ RoleName: name }).promise();
    debug('got role: %s', name);
    return response.Role;
  }

  async getInstanceProfile(name: string): Promise<AWS.IAM.InstanceProfile> {
    debug('getting instance profile: %s', name);
    const response = await this.iam().getInstanceProfile({ InstanceProfileName: name }).promise();
    return response.InstanceProfile;
  }
}