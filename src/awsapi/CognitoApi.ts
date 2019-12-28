import * as AWS from 'aws-sdk';
import { CognitoUserAttribute, ISignUpResult, CognitoUserPool, ICognitoUserPoolData, CognitoUserSession, CognitoUser, ICognitoUserData, IAuthenticationDetailsData, AuthenticationDetails } from 'amazon-cognito-identity-js';
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
    const response = await this.cognitoSp().describeUserPool().promise();
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
}