import { expect } from 'chai';
import { IamRole } from './../../src/iam/IamRole';
import { AwsApi } from './../../src/awsapi/AwsApi';
import * as sinon from 'sinon';
import { apiNodeCollectionStubs } from './../utils/stubs';

describe('IamRole', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.iam = () => (<any>{
      getRole: awsApiStub
    });

    const sut = new IamRole(<any>stubs.parentStub, 'roleName');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('roleName');
  });
});