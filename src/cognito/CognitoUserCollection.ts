import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CognitoUser } from './CognitoUser';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { CognitoUserPoolId } from './CognitoUserPool';

export class CognitoUserCollection extends ApiNodeCollection<CognitoUser, UserType> {
  poolId: CognitoUserPoolId;

  constructor(parent: ApiNode, poolId: CognitoUserPoolId) {
    super(parent);
    this.poolId = poolId;
  }

  protected load(): Promise<UserType[]> {
    return AwsApi.cognito.listUsers(this.poolId.poolId);
  }

  protected apiNodeFromAwsData(data: UserType): CognitoUser {
    return ApiNodeFactory.cognitoUser(this, data.Username, this.poolId);
  }

  protected apiNodeFromId(id: string): CognitoUser {
    return ApiNodeFactory.cognitoUser(this, id, this.poolId);
  }
}