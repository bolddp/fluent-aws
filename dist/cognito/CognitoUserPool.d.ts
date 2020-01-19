import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
export declare class CognitoUserPool extends AwsDataApiNode<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType> {
    static cognitoAttrIdMap: {
        [key: string]: string;
    };
    id: CognitoUserPoolId;
    constructor(parent: ApiNode, id: CognitoUserPoolId);
    loadAwsData(): Promise<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType>;
    signup(signupData: CognitoSignupData): Promise<AmazonCognitoIdentity.ISignUpResult>;
    login(loginData: CognitoLoginData): Promise<AmazonCognitoIdentity.CognitoUserSession>;
    refresh(refreshData: CognitoRefreshData): Promise<AmazonCognitoIdentity.CognitoUserSession>;
}
export interface CognitoUserPoolId {
    poolId: string;
    clientId?: string;
}
export interface CognitoSignupData {
    userName: string;
    password: string;
    attributes: CognitoSignupDataAttributes;
}
export interface CognitoSignupDataAttributes {
    address?: string;
    birthDate?: string;
    email?: string;
    familyName?: string;
    gender?: string;
    givenName?: string;
    locale?: string;
    middleName?: string;
    name?: string;
    nickname?: string;
    phoneNumber?: string;
    picture?: string;
    preferredUserName?: string;
    profile?: string;
    timezone?: string;
    updatedAt?: string;
    website?: string;
    custom?: {
        [key: string]: string;
    };
}
export interface CognitoLoginData {
    userName: string;
    password: string;
}
export interface CognitoRefreshData {
    userName: string;
    token: string;
}
