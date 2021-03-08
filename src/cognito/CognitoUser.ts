import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUserPoolId } from './CognitoUserPool';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { AdminGetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export class CognitoUser extends AwsDataApiNode<AdminGetUserResponse> {
  userName: string;
  poolId: CognitoUserPoolId;

  constructor(parent: ApiNode, userName: string, poolId: CognitoUserPoolId) {
    super(parent);
    this.userName = userName;
    this.poolId = poolId;
  }

  async loadAwsData(): Promise<AdminGetUserResponse> {
    return await AwsApi.cognito(this.config()).getUser(this.poolId.poolId, this.userName);
  }

  async login(password: string): Promise<AmazonCognitoIdentity.CognitoUserSession> {
    await this.ensureResolved();
    return await AwsApi.cognito(this.config()).login(this.poolId.poolId, this.poolId.clientId,
      this.userName, password);
  }

  async refresh(refreshToken: string): Promise<AmazonCognitoIdentity.CognitoUserSession> {
    await this.ensureResolved();
    return await AwsApi.cognito(this.config()).refresh(this.poolId.poolId, this.poolId.clientId,
      this.userName, refreshToken);
  }

  async addToGroup(groupName: string): Promise<void> {
    await this.ensureResolved();
    return await AwsApi.cognito(this.config()).addUserToGroup(this.poolId.poolId, this.userName, groupName);
  }

  async removeFromGroup(groupName: string): Promise<void> {
    await this.ensureResolved();
    return await AwsApi.cognito(this.config()).removeUserFromGroup(this.poolId.poolId, this.userName, groupName);
  }

  /**
   * Returns a string array containing the groups that this user belongs to.
   */
  async listGroups(): Promise<string[]> {
    await this.ensureResolved();
    return await AwsApi.cognito(this.config()).listGroupsForUser(this.poolId.poolId, this.userName);
  }

  async globalSignOut(): Promise<void> {
    await this.ensureResolved();
    return await AwsApi.cognito(this.config()).globalSignOut(this.poolId.poolId, this.userName);
  }

  async delete(): Promise<void> {
    await this.ensureResolved();
    await AwsApi.cognito(this.config()).deleteUser(this.poolId.poolId, this.userName);
  }
}