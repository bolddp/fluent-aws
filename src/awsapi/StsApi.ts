import * as AWS from 'aws-sdk';

export class StsApi {
  sts = () => new AWS.STS();

  async assumeRole(roleArn: string, sessionName: string): Promise<void> {
    const params = {
      DurationSeconds: 3600,
      ExternalId: sessionName,
      RoleArn: roleArn,
      RoleSessionName: sessionName
    };
    const assumed = await this.sts().assumeRole(params).promise();
    AWS.config.update({
      accessKeyId: assumed.Credentials.AccessKeyId,
      secretAccessKey: assumed.Credentials.SecretAccessKey,
      sessionToken: assumed.Credentials.SessionToken
    });
  }
}