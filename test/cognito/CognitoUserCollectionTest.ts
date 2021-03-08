import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { CognitoUserCollection } from '../../src/cognito/CognitoUserCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

describe('CognitoUserCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUser = stubs.factoryStub;

    const sut = new CognitoUserCollection(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId'
    });

    sut.apiNodeFromId('id');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUser = stubs.factoryStub;
    const awsData: UserType = {
      Username: 'userName'
    }

    const sut = new CognitoUserCollection(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId'
    });

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('userName');
    expect(stubs.factoryStub.args[0][2]).to.eql({ poolId: 'poolId', clientId: 'clientId' });
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito = () => (<any>{
      listUsers: stubs.awsApiStub.returns([{ Username: 'userName01' }, { Username: 'userName02' }])
    });

    const sut = new CognitoUserCollection(<any>stubs.parentStub, {
      poolId: 'poolId',
      clientId: 'clientId'
    });
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
  });
});