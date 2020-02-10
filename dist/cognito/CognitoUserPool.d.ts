import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { CognitoUser } from './CognitoUser';
import { CognitoUserCollection } from './CognitoUserCollection';
export declare class CognitoUserPool extends AwsDataApiNode<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType> {
    static cognitoAttrIdMap: {
        [key: string]: string;
    };
    id: CognitoUserPoolId;
    userCollection: CognitoUserCollection;
    constructor(parent: ApiNode, id: CognitoUserPoolId);
    loadAwsData(): Promise<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType>;
    users(): CognitoUserCollection;
    user(userName: string): CognitoUser;
    signup(signupData: CognitoSignupData): Promise<AmazonCognitoIdentity.ISignUpResult>;
    /**
     * Requests a verification code for a user with a specific email address. This verification code then
     * needs to be used together with a new password to perform the reset. This is done through the
     * {@link #resetPassword} function.
     */
    requestForgotPasswordCode(email: string): Promise<void>;
    /**
     * Sets a new password for a user.
     * @param email the email of the user whose password should be reset
     * @param verificationCode the verification code
     * @param password the new password
     */
    setNewUserPassword(email: string, verificationCode: string, password: string): Promise<void>;
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
