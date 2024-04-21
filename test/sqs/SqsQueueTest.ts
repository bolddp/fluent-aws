import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { SqsQueue } from '../../src/sqs/SqsQueue';

describe('SqsQueue', () => {
  it('will send JSON', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.sqs = () =>
      <any>{
        sendMessage: stubs.awsApiStub,
      };

    const sut = new SqsQueue(<any>stubs.parentStub, 'queueUrl');
    await sut.sendJson({ thisIsQueueData: true });

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith({
      MessageBody: '{"thisIsQueueData":true}',
      QueueUrl: 'queueUrl',
    });
  });

  it('will send JSON batch', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.sqs = () =>
      <any>{
        sendMessageBatch: stubs.awsApiStub,
      };

    const sut = new SqsQueue(<any>stubs.parentStub, 'queueUrl');
    await sut.sendJsonBatch(
      [...Array(12).keys()].map((index) => ({ thisIsValue: index }))
    );

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledTimes(2);
    expect(stubs.awsApiStub).toHaveBeenCalledWith({
      Entries: [
        { Id: '0', MessageBody: '{"thisIsValue":0}' },
        { Id: '1', MessageBody: '{"thisIsValue":1}' },
        { Id: '2', MessageBody: '{"thisIsValue":2}' },
        { Id: '3', MessageBody: '{"thisIsValue":3}' },
        { Id: '4', MessageBody: '{"thisIsValue":4}' },
        { Id: '5', MessageBody: '{"thisIsValue":5}' },
        { Id: '6', MessageBody: '{"thisIsValue":6}' },
        { Id: '7', MessageBody: '{"thisIsValue":7}' },
        { Id: '8', MessageBody: '{"thisIsValue":8}' },
        { Id: '9', MessageBody: '{"thisIsValue":9}' },
      ],
      QueueUrl: 'queueUrl',
    });
    expect(stubs.awsApiStub).toHaveBeenCalledWith({
      Entries: [
        { Id: '0', MessageBody: '{"thisIsValue":10}' },
        { Id: '1', MessageBody: '{"thisIsValue":11}' },
      ],
      QueueUrl: 'queueUrl',
    });
  });
});
