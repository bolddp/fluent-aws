import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { UserPoolDescriptionType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CognitoUserPool } from './CognitoUserPool';
export declare class CognitoUserPoolCollection extends ApiNodeCollection<CognitoUserPool, UserPoolDescriptionType> {
    apiNodeFromAwsData(data: UserPoolDescriptionType): CognitoUserPool;
    apiNodeFromId(id: string): CognitoUserPool;
    load(): Promise<UserPoolDescriptionType[]>;
}
