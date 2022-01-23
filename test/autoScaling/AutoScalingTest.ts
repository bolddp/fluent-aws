import { AutoScaling } from '../../src/autoScaling/AutoScaling';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';

describe('AutoScaling', () => {
  it('will provide access to groups', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroupCollection = stubs.factoryStub;

    const sut = new AutoScaling(<any>stubs.parentStub);

    await sut.groups().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a group', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroupCollection = stubs.factoryStub;

    const sut = new AutoScaling(<any>stubs.parentStub);

    await sut.group('groupName').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('groupName');
  });
});
