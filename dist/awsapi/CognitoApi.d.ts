import * as AWS from 'aws-sdk';
import { CognitoUserAttribute, ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js';
import { UserPoolDescriptionType, UserType, AdminGetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
export declare class CognitoApi {
    cognitoSp: () => AWS.CognitoIdentityServiceProvider;
    private getPoolData;
    private getCognitoUser;
    listUserPools(): Promise<UserPoolDescriptionType[]>;
    describeUserPool(poolId: string): Promise<UserPoolDescriptionType>;
    listUsers(poolId: string): Promise<UserType[]>;
    signup(poolId: string, clientId: string, userName: string, password: string, attributeList: CognitoUserAttribute[], skipVerification?: boolean): Promise<ISignUpResult>;
    login(poolId: string, clientId: string, userName: string, password: string): Promise<CognitoUserSession>;
    refresh(poolId: string, clientId: string, userName: string, refreshToken: string): Promise<CognitoUserSession>;
    getUser(poolId: string, userName: string): Promise<AdminGetUserResponse>;
    forgotPassword(poolId: string, clientId: string, userName: string): Promise<any>;
    confirmPassword(poolId: string, clientId: string, userName: string, verificationCode: string, newPassword: string): Promise<void>;
    deleteUser(poolId: string, userName: string): Promise<void>;
    addUserToGroup(poolId: string, userName: string, groupName: string): Promise<void>;
    removeUserFromGroup(poolId: string, userName: string, groupName: string): Promise<void>;
    globalSignOut(poolId: string, userName: string): Promise<void>;
}
