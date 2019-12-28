import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { CognitoUserPoolId } from './CognitoUserPool';
import { CognitoUserPoolCollection } from './CognitoUserPoolCollection';

export class Cognito extends ApiNode {
  userPoolCollection: CognitoUserPoolCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.userPoolCollection = ApiNodeFactory.cognitoUserPoolCollection(this);
  }

  userPool(poolId: CognitoUserPoolId) {
    return this.userPoolCollection.getById(`${poolId.poolId}/${poolId.clientId}`);
  }
}