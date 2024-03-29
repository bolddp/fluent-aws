import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CognitoUser } from './CognitoUser';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { CognitoUserPoolId } from './CognitoUserPool';
import { UserType } from '@aws-sdk/client-cognito-identity-provider';

export class CognitoUserCollection extends ApiNodeCollection<
  CognitoUser,
  UserType
> {
  poolId: CognitoUserPoolId;

  constructor(parent: ApiNode, poolId: CognitoUserPoolId) {
    super(parent);
    this.poolId = poolId;
  }

  load(): Promise<UserType[]> {
    return AwsApi.cognito(this.config()).listUsers(this.poolId.poolId);
  }

  apiNodeFromAwsData(data: UserType): CognitoUser {
    return ApiNodeFactory.cognitoUser(this, data.Username, this.poolId);
  }

  apiNodeFromId(id: string): CognitoUser {
    return ApiNodeFactory.cognitoUser(this, id, this.poolId);
  }
}
