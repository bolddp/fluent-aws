import { CognitoUserPoolCollection } from '../../src/cognito/CognitoUserPoolCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { expect } from 'chai';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { UserPoolDescriptionType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

describe('CognitoUserPoolCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUserPool = stubs.factoryStub;

    const sut = new CognitoUserPoolCollection(<any>stubs.parentStub);
    sut.apiNodeFromId('poolId/clientId');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.eql({ poolId: 'poolId', clientId: 'clientId' });
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUserPool = stubs.factoryStub;
    const awsData: UserPoolDescriptionType = {
      Id: 'poolId'
    }

    const sut = new CognitoUserPoolCollection(<any>stubs.parentStub);
    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.eql({ poolId: 'poolId' });
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.listUserPools = stubs.awsApiStub;

    const sut = new CognitoUserPoolCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });
});