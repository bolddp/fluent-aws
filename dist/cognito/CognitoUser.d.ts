import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUserPoolId } from './CognitoUserPool';
import { ApiNode } from '../node/ApiNode';
export declare class CognitoUser extends ApiNode {
    userName: string;
    poolId: CognitoUserPoolId;
    constructor(parent: ApiNode, userName: string, poolId: CognitoUserPoolId);
    login(password: string): Promise<AmazonCognitoIdentity.CognitoUserSession>;
    refresh(refreshToken: string): Promise<AmazonCognitoIdentity.CognitoUserSession>;
    addToGroup(groupName: string): Promise<void>;
    removeFromGroup(groupName: string): Promise<void>;
    globalSignOut(): Promise<void>;
    delete(): Promise<void>;
}
