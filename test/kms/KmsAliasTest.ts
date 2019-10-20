import { apiNodeCollectionStubs } from '../utils/stubs';
import { KmsAlias } from '../../src/kms/KmsAlias';
import { KmsKey } from '../../src/kms/KmsKey';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { expect } from 'chai';

describe('KmsAlias', () => {
  it('will provide key', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new KmsAlias(<any>stubs.parentStub, 'aliasName');

    const key = new KmsKey(sut, undefined);
    ApiNodeFactory.kmsKey = stubs.factoryStub.returns(key);

    AwsApi.kms.listAliases = stubs.awsApiStub.returns([
      { AliasName: 'aliasName', TargetKeyId: '123' },
      { AliasName: 'alias02', TargetKeyId: '456' }
    ]);

    await sut.key().ensureResolved();
    expect(sut.kmsKeyInstance.id).to.equal('123');
  });

  it('will throw on alias not found', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new KmsAlias(<any>stubs.parentStub, 'notFoundAliasName');

    const key = new KmsKey(sut, undefined);
    ApiNodeFactory.kmsKey = stubs.factoryStub.returns(key);

    AwsApi.kms.listAliases = stubs.awsApiStub.returns([
      { AliasName: 'aliasName', TargetKeyId: '123' },
      { AliasName: 'alias02', TargetKeyId: '456' }
    ]);

    let thrownError: Error;
    await sut.key().ensureResolved()
      .catch(error => thrownError = error);
    expect(thrownError).to.not.undefined;
    expect(thrownError.message).to.equal('Alias not found: notFoundAliasName');
  });

  it('will throw on alias referencing no key', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new KmsAlias(<any>stubs.parentStub, 'aliasName');

    const key = new KmsKey(sut, undefined);
    ApiNodeFactory.kmsKey = stubs.factoryStub.returns(key);

    AwsApi.kms.listAliases = stubs.awsApiStub.returns([
      { AliasName: 'aliasName' },
      { AliasName: 'alias02', TargetKeyId: '456' }
    ]);

    let thrownError: Error;
    await sut.key().ensureResolved()
      .catch(error => thrownError = error);
    expect(thrownError).to.not.undefined;
    expect(thrownError.message).to.equal('Alias does not reference any key: aliasName');
  });
});