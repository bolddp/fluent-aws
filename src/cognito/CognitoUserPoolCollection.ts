import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { UserPoolDescriptionType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CognitoUserPool } from './CognitoUserPool';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class CognitoUserPoolCollection extends ApiNodeCollection<CognitoUserPool, UserPoolDescriptionType> {

    apiNodeFromAwsData(data: UserPoolDescriptionType) {
      return ApiNodeFactory.cognitoUserPool(this, {
        poolId: data.Id
      })
    }

    apiNodeFromId(id: string) {
      // Id is of format poolId/clientId, and clientId may not be present
      const segments = id.split('/');
      const poolId = segments[0];
      const clientId = segments[1];
      return ApiNodeFactory.cognitoUserPool(this, { poolId, clientId });
    }

    load(): Promise<UserPoolDescriptionType[]> {
      return AwsApi.cognito.listUserPools();
    }
}