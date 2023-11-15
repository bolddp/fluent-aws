import { CognitoUserAttribute, ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js';
import { FluentAwsConfig } from '../FluentAwsConfig';
import { AdminGetUserResponse, CognitoIdentityProvider, UserPoolDescriptionType, UserType } from '@aws-sdk/client-cognito-identity-provider';
export declare class CognitoApi {
    private config;
    private cognitoSp;
    constructor(config: FluentAwsConfig);
    getClient(): CognitoIdentityProvider;
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
    listGroupsForUser(poolId: string, userName: string): Promise<string[]>;
    globalSignOut(poolId: string, userName: string): Promise<void>;
    private getPoolData;
    private getCognitoUser;
}
