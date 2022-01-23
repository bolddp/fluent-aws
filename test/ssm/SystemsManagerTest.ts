import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { SystemsManager } from '../../src/ssm/SystemsManager';

describe('SystemsManager', () => {
  it('will provide access to parameters', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameterCollection = stubs.factoryStub;

    const sut = new SystemsManager(<any>stubs.parentStub);

    await sut.parameters().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a parameter', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameterCollection = stubs.factoryStub;

    const sut = new SystemsManager(<any>stubs.parentStub);

    await sut.parameter('parameterName').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('parameterName');
  });
});
