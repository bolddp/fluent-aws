import { CognitoUserPool } from '../../src/cognito/CognitoUserPool';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
describe('CognitoUserPool', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.describeUserPool = stubs.awsApiStub;

    const sut = new CognitoUserPool(<any>stubs.parentStub, { poolId: 'poolId', clientId: 'clientId' });
    await sut.loadAwsData();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
  });

  it('will signup', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.signup = stubs.awsApiStub;

    const sut = new CognitoUserPool(<any>stubs.parentStub, { poolId: 'poolId', clientId: 'clientId' });
    await sut.signup({
      userName: 'userName',
      password: 'password',
      attributes: {
        email: 'email',
        familyName: 'familyName',
        givenName: 'givenName',
        custom: {
          authProvider: 'authProvider'
        }
      }
    });

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('clientId');
    expect(stubs.awsApiStub.args[0][2]).to.equal('userName');
    expect(stubs.awsApiStub.args[0][3]).to.equal('password');
  });

  it('will provide access to users', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUserCollection = stubs.factoryStub;

    const sut = new CognitoUserPool(<any> stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId'
    });

    await sut.users().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a user', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUserCollection = stubs.factoryStub;

    const sut = new CognitoUserPool(<any> stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId'
    });

    await sut.user('userId').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('userId');
  });

  it('will request forgotten password code', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.forgotPassword = stubs.awsApiStub;

    const sut = new CognitoUserPool(<any> stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId'
    });

    await sut.requestForgotPasswordCode('email');
    
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('clientId');
    expect(stubs.awsApiStub.args[0][2]).to.equal('email');
  });

  it('will set new password', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.confirmPassword = stubs.awsApiStub;

    const sut = new CognitoUserPool(<any> stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId'
    });

    await sut.setNewUserPassword('email', 'verificationCode', 'password');

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('clientId');
    expect(stubs.awsApiStub.args[0][2]).to.equal('email');
    expect(stubs.awsApiStub.args[0][3]).to.equal('verificationCode');
    expect(stubs.awsApiStub.args[0][4]).to.equal('password');
  });

  // it('will login', async () => {
  //   const stubs = apiNodeCollectionStubs();
  //   AwsApi.cognito.login = stubs.awsApiStub;

  //   const sut = new CognitoUserPool(<any>stubs.parentStub, { poolId: 'poolId', clientId: 'clientId' });
  //   await sut.login({ userName: 'userName', password: 'password' });

  //   expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
  //   expect(stubs.awsApiStub.calledOnce).to.be.true;
  //   expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
  //   expect(stubs.awsApiStub.args[0][1]).to.equal('clientId');
  //   expect(stubs.awsApiStub.args[0][2]).to.equal('userName');
  //   expect(stubs.awsApiStub.args[0][3]).to.equal('password');
  // });

  // it('will refresh', async () => {
  //   const stubs = apiNodeCollectionStubs();
  //   AwsApi.cognito.refresh = stubs.awsApiStub;

  //   const sut = new CognitoUserPool(<any>stubs.parentStub, { poolId: 'poolId', clientId: 'clientId' });
  //   await sut.refresh({ userName: 'userName', token: 'token' });

  //   expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
  //   expect(stubs.awsApiStub.calledOnce).to.be.true;
  //   expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
  //   expect(stubs.awsApiStub.args[0][1]).to.equal('clientId');
  //   expect(stubs.awsApiStub.args[0][2]).to.equal('userName');
  //   expect(stubs.awsApiStub.args[0][3]).to.equal('token');
  // });
});