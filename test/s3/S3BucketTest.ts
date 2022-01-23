import { apiNodeCollectionStubs } from '../utils/stubs';
import { S3Bucket } from '../../src/s3/S3Bucket';
import { AwsApi } from '../../src/awsapi/AwsApi';

import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';

describe('S3Bucket', () => {
  it('will return true if bucket exists', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        headBucket: stubs.awsApiStub.mockReturnValue({}),
      };
    const sut = new S3Bucket(<any>stubs.parentStub, 'bucketName');

    const exists = await sut.exists();
    expect(exists).toEqual(true);
  });

  it('will return false if bucket does not exist', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        headBucket: stubs.awsApiStub.mockImplementation(() => {
          throw { statusCode: 404 };
        }),
      };
    const sut = new S3Bucket(<any>stubs.parentStub, 'bucketName');

    const exists = await sut.exists();
    expect(exists).toEqual(false);
  });

  it('will rethrow error if statusCode != 404', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        headBucket: stubs.awsApiStub.mockImplementation(() => {
          throw { statusCode: 403 };
        }),
      };
    const sut = new S3Bucket(<any>stubs.parentStub, 'bucketName');
    // Promise should be rejected
    let wasRejected = false;
    await sut.exists().catch(() => (wasRejected = true));
    expect(wasRejected).toEqual(true);
  });

  it('will create bucket if it does not exist', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        headBucket: jest.fn().mockImplementation(() => {
          throw { statusCode: 404 };
        }),
        createBucket: stubs.awsApiStub,
      };

    const sut = new S3Bucket(<any>stubs.parentStub, 'bucketName');
    await sut.createIfNotExists().ensureResolved();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('bucketName');
  });

  it('will provide access to objects', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3ObjectCollection = stubs.factoryStub;

    const sut = new S3Bucket(<any>stubs.parentStub, 'bucketName');
    await sut.objects().ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to an object', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3ObjectCollection = stubs.factoryStub;

    const sut = new S3Bucket(<any>stubs.parentStub, 'bucketName');

    await sut.object('key').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('key');
  });
});
