import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';
import { CognitoUser } from './CognitoUser';
import { CognitoUserCollection } from './CognitoUserCollection';
import { ApiNodeFactory } from '../node/ApiNodeFactory';

export class CognitoUserPool extends AwsDataApiNode<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType> {
  static cognitoAttrIdMap: { [key: string]: string } = {
    'address': 'address', 'birthDate': 'birthdate', 'email': 'email', 'familyName': 'family_name', 'gender': 'gender', 'givenName': 'given_name',
    'locale': 'locale', 'middleName': 'middle_name', 'name': 'name', 'nickname': 'nickname', 'phoneNumber': 'phone_number', 'picture': 'picture',
    'preferredUserName': 'preferred_username', 'profile': 'profile', 'timezone': 'timezone', 'updatedAt': 'updated_at', 'website': 'website'
  }

  id: CognitoUserPoolId;
  userCollection: CognitoUserCollection;

  constructor(parent: ApiNode, id: CognitoUserPoolId) {
    super(parent);
    this.id = id;
    this.userCollection = ApiNodeFactory.cognitoUserCollection(this, this.id);
  }

  loadAwsData(): Promise<AWS.CognitoIdentityServiceProvider.UserPoolDescriptionType> {
    return AwsApi.cognito(this.config()).describeUserPool(this.id.poolId);
  }

  users(): CognitoUserCollection {
    return this.userCollection;
  }

  user(userName: string): CognitoUser {
    return this.userCollection.getById(userName);
  }

  async signup(signupData: CognitoSignupData): Promise<AmazonCognitoIdentity.ISignUpResult> {
    await this.ensureResolved();
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
    return await AwsApi.cognito(this.config()).signup(this.id.poolId, this.id.clientId,
      signupData.userName, signupData.password, attributeList, signupData.skipVerification);
  }

  /**
   * Requests a verification code for a user with a specific email address. This verification code then
   * needs to be used together with a new password to perform the reset. This is done through the
   * {@link #resetPassword} function.
   */
  async requestForgotPasswordCode(email: string): Promise<void> {
    await this.ensureResolved();
    await AwsApi.cognito(this.config()).forgotPassword(this.id.poolId, this.id.clientId, email);
  }

  /**
   * Sets a new password for a user.
   * @param email the email of the user whose password should be reset
   * @param verificationCode the verification code
   * @param password the new password
   */
  async setNewUserPassword(email: string, verificationCode: string, password: string): Promise<void> {
    await this.ensureResolved();
    await AwsApi.cognito(this.config()).confirmPassword(this.id.poolId, this.id.clientId, email, verificationCode, password);
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
  skipVerification?: boolean
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
  custom?: { [key: string]: string }
}