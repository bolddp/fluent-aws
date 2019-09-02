import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { Ecs } from '../../src/ecs/Ecs';

describe('Ecs', () => {
  it('will provide access to clusters', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsClusterCollection = stubs.factoryStub;

    const sut = new Ecs(<any> stubs.parentStub);

    await sut.clusters().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a cluster', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsClusterCollection = stubs.factoryStub;

    const sut = new Ecs(<any> stubs.parentStub);

    await sut.cluster('clusterId').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('clusterId');
  });

});