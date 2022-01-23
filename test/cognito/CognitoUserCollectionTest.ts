import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { CognitoUserCollection } from '../../src/cognito/CognitoUserCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

describe('CognitoUserCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUser = stubs.factoryStub;

    const sut = new CognitoUserCollection(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    sut.apiNodeFromId('id');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'id', {
      clientId: 'clientId',
      poolId: 'poolId',
    });
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUser = stubs.factoryStub;
    const awsData: UserType = {
      Username: 'userName',
    };

    const sut = new CognitoUserCollection(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId',
    });
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () =>
      <any>{
        listUsers: stubs.awsApiStub.mockReturnValue([
          { Username: 'userName01' },
          { Username: 'userName02' },
        ]),
      };

    const sut = new CognitoUserCollection(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId',
    });
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('poolId');
  });
});
