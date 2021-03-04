import * as sinon from 'sinon';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { KmsKey } from '../../src/kms/KmsKey';
import { expect } from 'chai';
describe('KmsKey', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.kms = () => (<any>{
      describeKey: awsApiStub
    });

    const sut = new KmsKey(<any>stubs.parentStub, 'keyId');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('keyId');
  });
});