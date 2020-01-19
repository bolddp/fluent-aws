import { apiNodeCollectionStubs } from '../utils/stubs';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Sns } from '../../src/sns/Sns';
import { expect } from 'chai';

describe('Sns', () => {
  it('will provide access to topics', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopicCollection = stubs.factoryStub;

    const sut = new Sns(<any> stubs.parentStub);

    await sut.topics().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a topic', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopicCollection = stubs.factoryStub;

    const sut = new Sns(<any> stubs.parentStub);

    await sut.topic('topicName').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('topicName');
  });
});