import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';
import { KmsKeyCollection } from '../../src/kms/KmsKeyCollection';

describe('KmsKeyCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsKey = stubs.factoryStub;

    const sut = new KmsKeyCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('keyId');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('keyId');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsKey = stubs.factoryStub;
    const awsData: AWS.KMS.KeyMetadata = <any> <unknown> {
      KeyId: 'keyId'
    }

    const sut = new KmsKeyCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('keyId');
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.kms.listKeys = stubs.awsApiStub.returns([{ KeyId: 'key01' }, { KeyId: 'key02' }]);
    const stubs2 = apiNodeCollectionStubs();
    AwsApi.kms.describeKey = stubs2.awsApiStub.returns({ KeyId: 'keyId' });

    const sut = new KmsKeyCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs2.awsApiStub.callCount).to.equal(2);
  });
});