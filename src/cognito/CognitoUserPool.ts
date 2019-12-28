import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';

export class CognitoUserPool extends AwsDataApiNode<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType> {
  static cognitoAttrIdMap: { [key: string]: string } = {
    'address': 'address', 'birthDate': 'birthdate', 'email': 'email', 'familyName': 'family_name', 'gender': 'gender', 'givenName': 'given_name',
    'locale': 'locale', 'middleName': 'middle_name', 'name': 'name', 'nickname': 'nickname', 'phoneNumber': 'phone_number', 'picture': 'picture',
    'preferredUserName': 'preferred_username', 'profile': 'profile', 'timezone': 'timezone', 'updatedAt': 'updated_at', 'website': 'website'
  }

  id: CognitoUserPoolId;

  constructor(parent: ApiNode, id: CognitoUserPoolId) {
    super(parent);
    this.id = id;
  }

  protected loadAwsData(): Promise<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType> {
    return AwsApi.cognito.describeUserPool(this.id.poolId);
  }

  signup(signupData: CognitoSignupData): Promise<AmazonCognitoIdentity.ISignUpResult> {
    const attributeList: AmazonCognitoIdentity.CognitoUserAttribute[] = [];
    // First map the standard attributes
    for (const key of Object.keys(signupData.attributes)) {
      const cognitoAttrId = CognitoUserPool.cognitoAttrIdMap[key];
      if (cognitoAttrId) {
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
          Name: cognitoAttrId,
          Value: (<any>signupData.attributes)[key]
        }));
      }
    }
    // Then map any custom attributes
    if (signupData.attributes.custom) {
      for (const key of Object.keys(signupData.attributes.custom)) {
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
          Name: `custom:${key}`,
          Value: signupData.attributes.custom[key]
        }));
      }
    }
    return AwsApi.cognito.signup(this.id.poolId, this.id.clientId,
      signupData.userName, signupData.password, attributeList);
  }
}

export interface CognitoUserPoolId {
  poolId: string;
  clientId?: string;
}

export interface CognitoSignupData {
  userName: string;
  password: string;
  attributes: CognitoSignupDataAttributes;
}

export interface CognitoSignupDataAttributes {
  address?: string;
  birthDate?: string;
  email?: string;
  familyName?: string;
  gender?: string;
  givenName?: string;
  locale?: string;
  middleName?: string;
  name?: string;
  nickname?: string;
  phoneNumber?: string;
  picture?: string;
  preferredUserName?: string;
  profile?: string;
  timezone?: string;
  updatedAt?: string;
  website?: string;
  custom: { [key: string]: string }
}