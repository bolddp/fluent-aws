import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CognitoUserPool } from './CognitoUserPool';
import { UserPoolDescriptionType } from '@aws-sdk/client-cognito-identity-provider';
export declare class CognitoUserPoolCollection extends ApiNodeCollection<CognitoUserPool, UserPoolDescriptionType> {
    apiNodeFromAwsData(data: UserPoolDescriptionType): CognitoUserPool;
    apiNodeFromId(id: string): CognitoUserPool;
    load(): Promise<UserPoolDescriptionType[]>;
}
