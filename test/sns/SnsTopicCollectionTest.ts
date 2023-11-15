import { apiNodeCollectionStubs } from '../utils/stubs';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { SnsTopicCollection } from '../../src/sns/SnsTopicCollection';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { Topic } from '@aws-sdk/client-sns';

describe('SnsTopicCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopic = stubs.factoryStub;

    const sut = new SnsTopicCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('id');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.snsTopic = stubs.factoryStub;
    const awsData: Topic = {
      TopicArn: 'topicArn',
    };

    const sut = new SnsTopicCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'topicArn');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.sns = () =>
      <any>{
        listTopics: stubs.awsApiStub.mockReturnValue([
          { TopicArn: 'topicArn01' },
          { TopicArn: 'topicArn02' },
        ]),
      };

    const sut = new SnsTopicCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });
});
