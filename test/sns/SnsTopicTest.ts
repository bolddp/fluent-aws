import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from "../../src/awsapi/AwsApi";
import { expect } from "chai";
import { SnsTopic } from '../../src/sns/SnsTopic';

describe('SnsTopic', () => {
  it('will publish JSON', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.sns.publish = stubs.awsApiStub;

    const sut = new SnsTopic(<any>stubs.parentStub, 'topicArn');
    await sut.publishJson({ thisIsTopicData: true });

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.eql({
      Message: '{\"thisIsTopicData\":true}',
      TopicArn: 'topicArn'
    });
  });
});