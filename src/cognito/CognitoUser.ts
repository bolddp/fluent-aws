import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUserPoolId } from './CognitoUserPool';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';

export class CognitoUser extends ApiNode {
  userName: string;
  poolId: CognitoUserPoolId;

  constructor(parent: ApiNode, userName: string, poolId: CognitoUserPoolId) {
    super(parent);
    this.userName = userName;
    this.poolId = poolId;
  }

  async login(password: string): Promise<AmazonCognitoIdentity.CognitoUserSession> {
    await this.ensureResolved();
    return AwsApi.cognito.login(this.poolId.poolId, this.poolId.clientId,
      this.userName, password);
  }

  async refresh(refreshToken: string): Promise<AmazonCognitoIdentity.CognitoUserSession> {
    await this.ensureResolved();
    return await AwsApi.cognito.refresh(this.poolId.poolId, this.poolId.clientId,
      this.userName, refreshToken);
  }

  async addToGroup(groupName: string): Promise<void> {
    await this.ensureResolved();
    return await AwsApi.cognito.addUserToGroup(this.poolId.poolId, this.userName, groupName);
  }

  async removeFromGroup(groupName: string): Promise<void> {
    await this.ensureResolved();
    return await AwsApi.cognito.removeUserFromGroup(this.poolId.poolId, this.userName, groupName);
  }

  async globalSignOut(): Promise<void> {
    await this.ensureResolved();
    return await AwsApi.cognito.globalSignOut(this.poolId.poolId, this.userName);
  }

  async delete(): Promise<void> {
    await this.ensureResolved();
    await AwsApi.cognito.deleteUser(this.poolId.poolId, this.userName);
  }
}