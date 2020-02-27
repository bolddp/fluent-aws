import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CognitoUser } from './CognitoUser';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { ApiNode } from '../node/ApiNode';
import { CognitoUserPoolId } from './CognitoUserPool';
export declare class CognitoUserCollection extends ApiNodeCollection<CognitoUser, UserType> {
    poolId: CognitoUserPoolId;
    constructor(parent: ApiNode, poolId: CognitoUserPoolId);
    load(): Promise<UserType[]>;
    apiNodeFromAwsData(data: UserType): CognitoUser;
    apiNodeFromId(id: string): CognitoUser;
}
