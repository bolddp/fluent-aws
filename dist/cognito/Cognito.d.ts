import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { ApiNode } from '../node/ApiNode';
import { CognitoUserPoolId } from './CognitoUserPool';
import { CognitoUserPoolCollection } from './CognitoUserPoolCollection';
export declare class Cognito extends ApiNode {
    userPoolCollection: CognitoUserPoolCollection;
    constructor(parent: ApiNode);
    userPool(poolId: CognitoUserPoolId): import("./CognitoUserPool").CognitoUserPool;
    client(): Promise<CognitoIdentityProvider>;
}
