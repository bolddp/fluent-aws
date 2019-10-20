import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';
import { KmsAliasCollection } from '../../src/kms/KmsAliasCollection';

describe('KmsAliasCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsAlias = stubs.factoryStub;

    const sut = new KmsAliasCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('aliasName');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('aliasName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsAlias = stubs.factoryStub;
    const awsData: AWS.KMS.AliasListEntry = <any> <unknown> {
      AliasName: 'aliasName'
    }

    const sut = new KmsAliasCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('aliasName');
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.kms.listAliases = stubs.awsApiStub.returns([{ AliasName: 'alias01' }, { AliasName: 'alias02' }]);

    const sut = new KmsAliasCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });
});