import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:IamApi');

export class IamApi {
  iam = () => new AWS.IAM();

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