import * as AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk';
import { AssumeRoleRequest } from 'aws-sdk/clients/sts';
import { FluentAwsConfig } from '../FluentAwsConfig';

export class StsApi {
  config: FluentAwsConfig;
  sts = () => new AWS.STS(this.config);

  constructor(config: FluentAwsConfig) {
    this.config = config;
  }

  async assumeRole(
    roleArn: string,
    sessionName: string,
    durationSeconds: number
  ): Promise<Credentials> {
    const params: AssumeRoleRequest = {
      DurationSeconds: durationSeconds,
      ExternalId: sessionName,
      RoleArn: roleArn,
      RoleSessionName: sessionName,
    };
    const assumed = await this.sts().assumeRole(params).promise();
    return new AWS.Credentials({
      accessKeyId: assumed.Credentials.AccessKeyId,
      secretAccessKey: assumed.Credentials.SecretAccessKey,
      sessionToken: assumed.Credentials.SessionToken,
    });
  }
}
