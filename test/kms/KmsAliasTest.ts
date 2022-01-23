import { apiNodeCollectionStubs } from '../utils/stubs';
import { KmsAlias } from '../../src/kms/KmsAlias';
import { KmsKey } from '../../src/kms/KmsKey';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('KmsAlias', () => {
  it('will provide key', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new KmsAlias(<any>stubs.parentStub, 'aliasName');

    const key = new KmsKey(sut, undefined);
    ApiNodeFactory.kmsKey = stubs.factoryStub.mockReturnValue(key);

    AwsApi.kms = () =>
      <any>{
        listAliases: stubs.awsApiStub.mockReturnValue([
          { AliasName: 'aliasName', TargetKeyId: '123' },
          { AliasName: 'alias02', TargetKeyId: '456' },
        ]),
      };

    await sut.key().ensureResolved();
    expect(sut.kmsKeyInstance.id).toEqual('123');
  });

  it('will throw on alias not found', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new KmsAlias(<any>stubs.parentStub, 'notFoundAliasName');

    const key = new KmsKey(sut, undefined);
    ApiNodeFactory.kmsKey = stubs.factoryStub.mockReturnValue(key);

    AwsApi.kms = () =>
      <any>{
        listAliases: stubs.awsApiStub.mockReturnValue([
          { AliasName: 'aliasName', TargetKeyId: '123' },
          { AliasName: 'alias02', TargetKeyId: '456' },
        ]),
      };

    let thrownError: Error;
    await sut
      .key()
      .ensureResolved()
      .catch((error) => (thrownError = error));
    expect(thrownError).toBeDefined();
    expect(thrownError.message).toEqual('Alias not found: notFoundAliasName');
  });

  it('will throw on alias referencing no key', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new KmsAlias(<any>stubs.parentStub, 'aliasName');

    const key = new KmsKey(sut, undefined);
    ApiNodeFactory.kmsKey = stubs.factoryStub.mockReturnValue(key);

    AwsApi.kms = () =>
      <any>{
        listAliases: stubs.awsApiStub.mockReturnValue([
          { AliasName: 'aliasName' },
          { AliasName: 'alias02', TargetKeyId: '456' },
        ]),
      };

    let thrownError: Error;
    await sut
      .key()
      .ensureResolved()
      .catch((error) => (thrownError = error));
    expect(thrownError).toBeDefined();
    expect(thrownError.message).toEqual(
      'Alias does not reference any key: aliasName'
    );
  });
});
