import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { Ecs } from '../../src/ecs/Ecs';

describe('Ecs', () => {
  it('will provide access to clusters', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsClusterCollection = stubs.factoryStub;

    const sut = new Ecs(<any>stubs.parentStub);

    await sut.clusters().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a cluster', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsClusterCollection = stubs.factoryStub;

    const sut = new Ecs(<any>stubs.parentStub);

    await sut.cluster('clusterId').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('clusterId');
  });
});
