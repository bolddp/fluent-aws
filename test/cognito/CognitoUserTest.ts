import { CognitoUser } from '../../src/cognito/CognitoUser';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('CognitoUser', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.cognito = () =>
      <any>{
        getUser: awsApiStub,
      };

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });
    const user = await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('poolId', 'userName');
  });

  it('will login', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        login: stubs.awsApiStub,
      };

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.login('password');

    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'poolId',
      'clientId',
      'userName',
      'password'
    );
  });

  it('will refresh', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        refresh: stubs.awsApiStub,
      };

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.refresh('refreshToken');

    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'poolId',
      'clientId',
      'userName',
      'refreshToken'
    );
  });

  it('will add to group', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        addUserToGroup: stubs.awsApiStub,
      };

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.addToGroup('groupName');

    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'poolId',
      'userName',
      'groupName'
    );
  });

  it('will remove from group', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        removeUserFromGroup: stubs.awsApiStub,
      };

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.removeFromGroup('groupName');

    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'poolId',
      'userName',
      'groupName'
    );
  });

  it('will global sign out', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        globalSignOut: stubs.awsApiStub,
      };

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.globalSignOut();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('poolId', 'userName');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        deleteUser: stubs.awsApiStub,
      };

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    await sut.delete();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('poolId', 'userName');
  });
});
