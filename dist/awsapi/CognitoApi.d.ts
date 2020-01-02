import * as AWS from 'aws-sdk';
import { CognitoUserAttribute, ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js';
import { UserPoolDescriptionType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
export declare class CognitoApi {
    cognitoSp: () => AWS.CognitoIdentityServiceProvider;
    private getPoolData;
    private getUser;
    listUserPools(): Promise<UserPoolDescriptionType[]>;
    describeUserPool(poolId: string): Promise<UserPoolDescriptionType>;
    signup(poolId: string, clientId: string, userName: string, password: string, attributeList: CognitoUserAttribute[]): Promise<ISignUpResult>;
    login(poolId: string, clientId: string, userName: string, password: string): Promise<CognitoUserSession>;
    refresh(poolId: string, clientId: string, userName: string, refreshToken: string): Promise<CognitoUserSession>;
}
