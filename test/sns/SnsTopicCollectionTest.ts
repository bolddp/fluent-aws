import { apiNodeCollectionStubs } from "../utils/stubs";
import { ApiNodeFactory } from "../../src/node/ApiNodeFactory";
import { expect } from "chai";
import { SnsTopicCollection } from '../../src/sns/SnsTopicCollection';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('SnsTopicCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopic = stubs.factoryStub;

    const sut = new SnsTopicCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('id');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopic = stubs.factoryStub;
    const awsData: AWS.SNS.Topic = {
      TopicArn: 'topicArn'
    }

    const sut = new SnsTopicCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('topicArn');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.sns.listTopics = stubs.awsApiStub.returns([{ TopicArn: 'topicArn01' }, { TopicArn: 'topicArn02' }]);

    const sut = new SnsTopicCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });
});