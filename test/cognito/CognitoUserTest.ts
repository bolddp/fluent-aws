import * as sinon from "sinon";
import { expect } from "chai";
import { CognitoUser } from "../../src/cognito/CognitoUser";
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from "../../src/awsapi/AwsApi";

describe('CognitoUser', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.cognito.getUser = awsApiStub;

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId'
    });
    const user = await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('poolId');
    expect(awsApiStub.args[0][1]).to.equal('userName');
  });

  it('will login', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.login = stubs.awsApiStub;

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId'
    })

    await sut.login('password');

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('clientId');
    expect(stubs.awsApiStub.args[0][2]).to.equal('userName');
    expect(stubs.awsApiStub.args[0][3]).to.equal('password');
  });

  it('will refresh', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.refresh = stubs.awsApiStub;

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId'
    })

    await sut.refresh('refreshToken');

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('clientId');
    expect(stubs.awsApiStub.args[0][2]).to.equal('userName');
    expect(stubs.awsApiStub.args[0][3]).to.equal('refreshToken');
  });

  it('will add to group', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.addUserToGroup = stubs.awsApiStub;

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId'
    })

    await sut.addToGroup('groupName');

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('userName');
    expect(stubs.awsApiStub.args[0][2]).to.equal('groupName');
  });

  it('will remove from group', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.removeUserFromGroup = stubs.awsApiStub;

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId'
    })

    await sut.removeFromGroup('groupName');

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('userName');
    expect(stubs.awsApiStub.args[0][2]).to.equal('groupName');
  });

  it('will global sign out', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.globalSignOut = stubs.awsApiStub;

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId'
    })

    await sut.globalSignOut();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('userName');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cognito.deleteUser = stubs.awsApiStub;

    const sut = new CognitoUser(<any>stubs.parentStub, 'userName', {
      poolId: 'poolId',
      clientId: 'clientId'
    })

    await sut.delete();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('poolId');
    expect(stubs.awsApiStub.args[0][1]).to.equal('userName');
  });
});