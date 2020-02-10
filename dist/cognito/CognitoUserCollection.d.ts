import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CognitoUser } from './CognitoUser';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { ApiNode } from '../node/ApiNode';
import { CognitoUserPoolId } from './CognitoUserPool';
export declare class CognitoUserCollection extends ApiNodeCollection<CognitoUser, UserType> {
    poolId: CognitoUserPoolId;
    constructor(parent: ApiNode, poolId: CognitoUserPoolId);
    protected load(): Promise<UserType[]>;
    protected apiNodeFromAwsData(data: UserType): CognitoUser;
    protected apiNodeFromId(id: string): CognitoUser;
}
