import { CognitoUserPool } from '../../src/cognito/CognitoUserPool';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
describe('CognitoUserPool', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        describeUserPool: stubs.awsApiStub,
      };

    const sut = new CognitoUserPool(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });
    await sut.loadAwsData();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('poolId');
  });

  it('will signup', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        signup: stubs.awsApiStub,
      };

    const sut = new CognitoUserPool(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });
    await sut.signup({
      userName: 'userName',
      password: 'password',
      attributes: {
        email: 'email',
        familyName: 'familyName',
        givenName: 'givenName',
        custom: {
          authProvider: 'authProvider',
        },
      },
      skipVerification: true,
    });

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'poolId',
      'clientId',
      'userName',
      'password',
      [
        { Name: 'email', Value: 'email' },
        { Name: 'family_name', Value: 'familyName' },
        { Name: 'given_name', Value: 'givenName' },
        { Name: 'custom:authProvider', Value: 'authProvider' },
      ],
      true
    );
  });

  it('will provide access to users', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUserCollection = stubs.factoryStub;

    const sut = new CognitoUserPool(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.users().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a user', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUserCollection = stubs.factoryStub;

    const sut = new CognitoUserPool(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.user('userId').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('userId');
  });

  it('will request forgotten password code', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        forgotPassword: stubs.awsApiStub,
      };

    const sut = new CognitoUserPool(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.requestForgotPasswordCode('email');

    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'poolId',
      'clientId',
      'email'
    );
  });

  it('will set new password', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        confirmPassword: stubs.awsApiStub,
      };

    const sut = new CognitoUserPool(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.setNewUserPassword('email', 'verificationCode', 'password');

    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'poolId',
      'clientId',
      'email',
      'verificationCode',
      'password'
    );
  });
});
