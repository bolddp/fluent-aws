import { AwsCredentialIdentity, Credentials } from '@aws-sdk/types';
import { FluentAwsConfig } from '../FluentAwsConfig';
import { AssumeRoleRequest, STS } from '@aws-sdk/client-sts';

export class StsApi {
  private sts = () => new STS(this.config);

  constructor(private config: FluentAwsConfig) {}

  async assumeRole(
    roleArn: string,
    sessionName: string,
    durationSeconds: number
  ): Promise<AwsCredentialIdentity> {
    const params: AssumeRoleRequest = {
      DurationSeconds: durationSeconds,
      ExternalId: sessionName,
      RoleArn: roleArn,
      RoleSessionName: sessionName,
    };
    const assumed = await this.sts().assumeRole(params);
    return {
      accessKeyId: assumed.Credentials.AccessKeyId,
      secretAccessKey: assumed.Credentials.SecretAccessKey,
      sessionToken: assumed.Credentials.SessionToken,
    };
  }
}
