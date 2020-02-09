import * as AWS from 'aws-sdk';
import { CognitoUserAttribute, ISignUpResult, CognitoUserPool, ICognitoUserPoolData, CognitoUserSession, CognitoUser, ICognitoUserData, IAuthenticationDetailsData, AuthenticationDetails, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { UserPoolDescriptionType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

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

  async signup(poolId: string, clientId: string, userName: string, password: string, attributeList: CognitoUserAttribute[]): Promise<ISignUpResult> {
    debug('signing up: %s, clientId: %s, userName: %s, attr: %j', poolId, clientId, userName, attributeList);
    const poolData = this.getPoolData(poolId, clientId);
    return new Promise((resolve, reject) => {
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

    const user = this.getUser(poolId, clientId, userName);
    return await new Promise<CognitoUserSession>((resolve, reject) => {
      user.authenticateUser(authenticationDetails, {
        onSuccess: (session: CognitoUserSession) => resolve(session),
        onFailure: (err: any) => reject(err)
      });
    });
  }

  async refresh(poolId: string, clientId: string, userName: string, refreshToken: string): Promise<CognitoUserSession> {
    const user = this.getUser(poolId, clientId, userName);
    return await new Promise<CognitoUserSession>((resolve, reject) => {
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
    const user = this.getUser(poolId, clientId, userName);
    return await new Promise<any>((resolve, reject) => {
      user.forgotPassword({
        onSuccess: rsp => resolve(rsp),
        onFailure: error => reject(error)
      });
    });
  }

  async confirmPassword(poolId: string, clientId: string, userName: string,
    verificationCode: string, newPassword: string): Promise<void> {
    const user = this.getUser(poolId, clientId, userName);
    await new Promise<void>((resolve, reject) => {
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => resolve(),
        onFailure: (error) => reject(error)
      })
    });
  }
}