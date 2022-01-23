import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { Kms } from '../../src/kms/Kms';

describe('Kms', () => {
  it('will provide access to aliases', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsAliasCollection = stubs.factoryStub;

    const sut = new Kms(<any>stubs.parentStub);

    await sut.aliases().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to an alias', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsAliasCollection = stubs.factoryStub;

    const sut = new Kms(<any>stubs.parentStub);

    await sut.alias('alias').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('alias');
  });

  it('will provide access to keys', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsKeyCollection = stubs.factoryStub;

    const sut = new Kms(<any>stubs.parentStub);

    await sut.keys().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a key', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsKeyCollection = stubs.factoryStub;

    const sut = new Kms(<any>stubs.parentStub);

    await sut.key('keyId').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('keyId');
  });
});
