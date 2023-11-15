import { IAM, InstanceProfile, Role } from '@aws-sdk/client-iam';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:IamApi');

export class IamApi {
  private iam = () => new IAM(this.config);

  constructor(private config: FluentAwsConfig) {}

  async getRole(name: string): Promise<Role> {
    debug('getting role: %s', name);
    const response = await this.iam().getRole({ RoleName: name });
    debug('got role: %s', name);
    return response.Role;
  }

  async getInstanceProfile(name: string): Promise<InstanceProfile> {
    debug('getting instance profile: %s', name);
    const response = await this.iam().getInstanceProfile({
      InstanceProfileName: name,
    });
    return response.InstanceProfile;
  }
}
