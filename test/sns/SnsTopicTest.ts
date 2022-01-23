import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { SnsTopic } from '../../src/sns/SnsTopic';

describe('SnsTopic', () => {
  it('will publish JSON', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.sns = () =>
      <any>{
        publish: stubs.awsApiStub,
      };

    const sut = new SnsTopic(<any>stubs.parentStub, 'topicArn');
    await sut.publishJson({ thisIsTopicData: true });

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith({
      Message: '{"thisIsTopicData":true}',
      TopicArn: 'topicArn',
    });
  });
});
