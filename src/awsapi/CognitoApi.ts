import {
  CognitoUserAttribute,
  ISignUpResult,
  CognitoUserPool,
  ICognitoUserPoolData,
  CognitoUserSession,
  CognitoUser,
  ICognitoUserData,
  IAuthenticationDetailsData,
  AuthenticationDetails,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import { FluentAwsConfig } from '../FluentAwsConfig';
import {
  AdminGetUserResponse,
  CognitoIdentityProvider,
  UserPoolDescriptionType,
  UserType,
} from '@aws-sdk/client-cognito-identity-provider';

const debug = require('debug')('fluentaws:CognitoApi');

export class CognitoApi {
  private cognitoSp = () => new CognitoIdentityProvider(this.config);

  constructor(private config: FluentAwsConfig) {}

  getClient(): CognitoIdentityProvider {
    return this.cognitoSp();
  }

  async listUserPools(): Promise<UserPoolDescriptionType[]> {
    debug('listing user pools');
    const response = await this.cognitoSp().listUserPools({ MaxResults: 60 });
    debug('listed user pools');
    return response.UserPools;
  }

  async describeUserPool(poolId: string): Promise<UserPoolDescriptionType> {
    debug('describing user pool: %s', poolId);
    const response = await this.cognitoSp().describeUserPool({
      UserPoolId: poolId,
    });
    debug('described user pool');
    return response.UserPool;
  }

  async listUsers(poolId: string): Promise<UserType[]> {
    debug('listing users');
    let result: UserType[] = [];
    const recursiveFunction = async (paginationToken?: string) => {
      const response = await this.cognitoSp().listUsers({
        UserPoolId: poolId,
        PaginationToken: paginationToken,
      });
      result = result.concat(response.Users);
      if (response.PaginationToken) {
        await recursiveFunction(response.PaginationToken);
      }
    };
    await recursiveFunction();
    debug('listed users');
    return result;
  }

  async signup(
    poolId: string,
    clientId: string,
    userName: string,
    password: string,
    attributeList: CognitoUserAttribute[],
    skipVerification: boolean = false
  ): Promise<ISignUpResult> {
    if (!skipVerification) {
      debug(
        'signing up: %s, clientId: %s, userName: %s, attr: %j',
        poolId,
        clientId,
        userName,
        attributeList
      );
      return new Promise((resolve, reject) => {
        const poolData = this.getPoolData(poolId, clientId);
        poolData.signUp(
          userName,
          password,
          attributeList,
          null,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              debug('signed up');
              resolve(result);
            }
          }
        );
      });
    } else {
      debug(
        'admin create user: %s, clientId: %s, userName: %s, attr: %j',
        poolId,
        clientId,
        userName,
        attributeList
      );
      const rsp = await this.cognitoSp().adminCreateUser({
        UserPoolId: poolId,
        Username: userName,
        DesiredDeliveryMediums: ['EMAIL'],
        ForceAliasCreation: false,
        MessageAction: 'SUPPRESS',
        TemporaryPassword: '!ItIsTemp01',
        UserAttributes: attributeList.map((a) => {
          return { Name: a.getName(), Value: a.getValue() };
        }),
      });
      debug('admin created user');
      debug(
        'admin set user password: %s, clientId: %s, userName: %s',
        poolId,
        clientId,
        userName
      );
      await this.cognitoSp().adminSetUserPassword({
        UserPoolId: poolId,
        Username: rsp.User.Username,
        Password: password,
        Permanent: true,
      });
      debug('admin did set user password');
      return {
        user: this.getCognitoUser(poolId, clientId, userName),
        userConfirmed: true,
        userSub: rsp.User.Username,
        codeDeliveryDetails: undefined,
      };
    }
  }

  async login(
    poolId: string,
    clientId: string,
    userName: string,
    password: string
  ): Promise<CognitoUserSession> {
    const authenticationData: IAuthenticationDetailsData = {
      Username: userName,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return await new Promise<CognitoUserSession>((resolve, reject) => {
      const user = this.getCognitoUser(poolId, clientId, userName);
      user.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => resolve(session),
        onFailure: (err: any) => reject(err),
      });
    });
  }

  async refresh(
    poolId: string,
    clientId: string,
    userName: string,
    refreshToken: string
  ): Promise<CognitoUserSession> {
    return await new Promise<CognitoUserSession>((resolve, reject) => {
      const user = this.getCognitoUser(poolId, clientId, userName);
      user.refreshSession(
        new CognitoRefreshToken({ RefreshToken: refreshToken }),
        (err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        }
      );
    });
  }

  async getUser(
    poolId: string,
    userName: string
  ): Promise<AdminGetUserResponse> {
    return await this.cognitoSp().adminGetUser({
      UserPoolId: poolId,
      Username: userName,
    });
  }

  async forgotPassword(
    poolId: string,
    clientId: string,
    userName: string
  ): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      const user = this.getCognitoUser(poolId, clientId, userName);
      user.forgotPassword({
        onSuccess: (rsp) => resolve(rsp),
        onFailure: (error) => reject(error),
      });
    });
  }

  async confirmPassword(
    poolId: string,
    clientId: string,
    userName: string,
    verificationCode: string,
    newPassword: string
  ): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const user = this.getCognitoUser(poolId, clientId, userName);
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => resolve(),
        onFailure: (error) => reject(error),
      });
    });
  }

  async deleteUser(poolId: string, userName: string): Promise<void> {
    debug('deleting user: %s, poolId: %s', userName, poolId);
    await this.cognitoSp().adminDeleteUser({
      UserPoolId: poolId,
      Username: userName,
    });
    debug('deleted user');
  }

  async addUserToGroup(
    poolId: string,
    userName: string,
    groupName: string
  ): Promise<void> {
    debug(
      'adding user to group: %s, poolId: %s, group: %s',
      userName,
      poolId,
      groupName
    );
    await this.cognitoSp().adminAddUserToGroup({
      UserPoolId: poolId,
      Username: userName,
      GroupName: groupName,
    });
    debug('added user to group');
  }

  async removeUserFromGroup(
    poolId: string,
    userName: string,
    groupName: string
  ): Promise<void> {
    debug(
      'removing user from group: %s, poolId: %s, group: %s',
      userName,
      poolId,
      groupName
    );
    await this.cognitoSp().adminRemoveUserFromGroup({
      UserPoolId: poolId,
      Username: userName,
      GroupName: groupName,
    });
    debug('removed user from group');
  }

  async listGroupsForUser(poolId: string, userName: string): Promise<string[]> {
    debug('listing groups for user: %s, poolId: %s', userName, poolId);
    const response = await this.cognitoSp().adminListGroupsForUser({
      UserPoolId: poolId,
      Username: userName,
    });
    return response.Groups.map((g) => g.GroupName);
  }

  async globalSignOut(poolId: string, userName: string): Promise<void> {
    debug('globally signing out user: %s, poolId:', userName, poolId);
    await this.cognitoSp().adminUserGlobalSignOut({
      UserPoolId: poolId,
      Username: userName,
    });
    debug('globally signed out user');
  }

  private getPoolData(poolId: string, clientId: string): CognitoUserPool {
    const poolData: ICognitoUserPoolData = {
      UserPoolId: poolId,
      ClientId: clientId,
    };
    return new CognitoUserPool(poolData);
  }

  private getCognitoUser(
    poolId: string,
    clientId: string,
    userName: string
  ): CognitoUser {
    const pool = this.getPoolData(poolId, clientId);
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: pool,
    };
    return new CognitoUser(userData);
  }
}
