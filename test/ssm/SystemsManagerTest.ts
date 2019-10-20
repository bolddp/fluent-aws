import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { SystemsManager } from '../../src/ssm/SystemsManager';

describe('SystemsManager', () => {
  it('will provide access to parameters', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameterCollection = stubs.factoryStub;

    const sut = new SystemsManager(<any> stubs.parentStub);

    await sut.parameters().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a parameter', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameterCollection = stubs.factoryStub;

    const sut = new SystemsManager(<any> stubs.parentStub);

    await sut.parameter('parameterName').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('parameterName');
  });
});