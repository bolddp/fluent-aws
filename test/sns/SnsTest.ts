import { apiNodeCollectionStubs } from '../utils/stubs';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Sns } from '../../src/sns/Sns';

describe('Sns', () => {
  it('will provide access to topics', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopicCollection = stubs.factoryStub;

    const sut = new Sns(<any>stubs.parentStub);

    await sut.topics().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a topic', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopicCollection = stubs.factoryStub;

    const sut = new Sns(<any>stubs.parentStub);

    await sut.topic('topicName').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('topicName');
  });
});
