import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUserPoolId } from './CognitoUserPool';
import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { AdminGetUserResponse } from '@aws-sdk/client-cognito-identity-provider';
export declare class CognitoUser extends AwsDataApiNode<AdminGetUserResponse> {
    userName: string;
    poolId: CognitoUserPoolId;
    constructor(parent: ApiNode, userName: string, poolId: CognitoUserPoolId);
    loadAwsData(): Promise<AdminGetUserResponse>;
    login(password: string): Promise<AmazonCognitoIdentity.CognitoUserSession>;
    refresh(refreshToken: string): Promise<AmazonCognitoIdentity.CognitoUserSession>;
    addToGroup(groupName: string): Promise<void>;
    removeFromGroup(groupName: string): Promise<void>;
    /**
     * Returns a string array containing the groups that this user belongs to.
     */
    listGroups(): Promise<string[]>;
    globalSignOut(): Promise<void>;
    delete(): Promise<void>;
    updateAttributes(attributes: {
        [key: string]: string;
    }): Promise<void>;
}
