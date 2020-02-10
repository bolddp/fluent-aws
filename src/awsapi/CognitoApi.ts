import * as AWS from 'aws-sdk';
import { CognitoUserAttribute, ISignUpResult, CognitoUserPool, ICognitoUserPoolData,
  CognitoUserSession, CognitoUser, ICognitoUserData, IAuthenticationDetailsData,
  AuthenticationDetails, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { UserPoolDescriptionType, UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

const debug = require('debug')('fluentaws:CognitoApi');

export class CognitoApi {
  cognitoSp = () => new AWS.CognitoIdentityServiceProvider();

  private getPoolData(poolId: string, clientId: string): CognitoUserPool {
    const poolData: ICognitoUserPoolData = {
      UserPoolId: poolId,
      ClientId: clientId
    };
    return new CognitoUserPool(poolData);
  }

  private getUser(poolId: string, clientId: string, userName: string): CognitoUser {
    const pool = this.getPoolData(poolId, clientId);
    const userData: ICognitoUserData = {
      Username: userName,
      Pool: pool
    };
    return new CognitoUser(userData);
  }

  async listUserPools(): Promise<UserPoolDescriptionType[]> {
    debug('listing user pools');
    const response = await this.cognitoSp().listUserPools().promise();
    debug('listed user pools');
    return response.UserPools;
  }

  async describeUserPool(poolId: string): Promise<UserPoolDescriptionType> {
    debug('describing user pool: %s', poolId);
    const response = await this.cognitoSp().describeUserPool({
      UserPoolId: poolId
    }).promise();
    debug('described user pool');
    return response.UserPool;
  }

  async listUsers(poolId: string): Promise<UserType[]> {
    debug('listing users');
    let result: UserType[] = [];
    const recursiveFunction = async (paginationToken?: string) => {
      const response = await this.cognitoSp().listUsers({
        UserPoolId: poolId,
        PaginationToken: paginationToken
      }).promise();
      result = result.concat(response.Users);
      if (response.PaginationToken) {
        await recursiveFunction(response.PaginationToken);
      }
    }
    await recursiveFunction();
    debug('listed users');
    return result;
  }

  async signup(poolId: string, clientId: string, userName: string, password: string, attributeList: CognitoUserAttribute[]): Promise<ISignUpResult> {
    debug('signing up: %s, clientId: %s, userName: %s, attr: %j', poolId, clientId, userName, attributeList);
    return new Promise((resolve, reject) => {
      const poolData = this.getPoolData(poolId, clientId);
      poolData.signUp(userName, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          debug('signed up');
          resolve(result);
        }
      });
    })
  }

  async login(poolId: string, clientId: string, userName: string, password: string): Promise<CognitoUserSession> {
    const authenticationData: IAuthenticationDetailsData = {
      Username: userName,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return await new Promise<CognitoUserSession>((resolve, reject) => {
      const user = this.getUser(poolId, clientId, userName);
      user.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => resolve(session),
        onFailure: (err: any) => reject(err)
      });
    });
  }

  async refresh(poolId: string, clientId: string, userName: string, refreshToken: string): Promise<CognitoUserSession> {
    return await new Promise<CognitoUserSession>((resolve, reject) => {
      const user = this.getUser(poolId, clientId, userName);
      user.refreshSession(new CognitoRefreshToken({ RefreshToken: refreshToken }), (err, session) => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    });
  }

  async forgotPassword(poolId: string, clientId: string, userName: string): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      const user = this.getUser(poolId, clientId, userName);
      user.forgotPassword({
        onSuccess: rsp => resolve(rsp),
        onFailure: error => reject(error)
      });
    });
  }

  async confirmPassword(poolId: string, clientId: string, userName: string,
    verificationCode: string, newPassword: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const user = this.getUser(poolId, clientId, userName);
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => resolve(),
        onFailure: (error) => reject(error)
      });
    });
  }

  async deleteUser(poolId: string, userName: string): Promise<void> {
    debug('deleting user: %s, poolId: %s', userName, poolId);
    await this.cognitoSp().adminDeleteUser({
      UserPoolId: poolId,
      Username: userName
    }).promise();
    debug('deleted user');
  }

  async addUserToGroup(poolId: string, userName: string, groupName: string): Promise<void> {
    debug('adding user to group: %s, poolId: %s, group: %s', userName, poolId, groupName);
    await this.cognitoSp().adminAddUserToGroup({
      UserPoolId: poolId,
      Username: userName,
      GroupName: groupName
    }).promise();
    debug('added user to group');
  }

  async removeUserFromGroup(poolId: string, userName: string, groupName: string): Promise<void> {
    debug('removing user from group: %s, poolId: %s, group: %s', userName, poolId, groupName);
    await this.cognitoSp().adminRemoveUserFromGroup({
      UserPoolId: poolId,
      Username: userName,
      GroupName: groupName
    }).promise();
    debug('removed user from group');
  }

  async globalSignOut(poolId: string, userName: string): Promise<void> {
    debug('globally signing out user: %s, poolId:', userName, poolId);
    await this.cognitoSp().adminUserGlobalSignOut({
      UserPoolId: poolId,
      Username: userName
    }).promise();
    debug('globally signed out user');
  }
}