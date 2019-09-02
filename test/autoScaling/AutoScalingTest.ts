import { expect } from 'chai';
import { AutoScaling } from '../../src/autoScaling/AutoScaling';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';

describe('AutoScaling', () => {
  it('will provide access to groups', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroupCollection = stubs.factoryStub;

    const sut = new AutoScaling(<any> stubs.parentStub);

    await sut.groups().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a group', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroupCollection = stubs.factoryStub;

    const sut = new AutoScaling(<any> stubs.parentStub);

    await sut.group('groupName').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('groupName');
  });
});