import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { S3Object } from '../../src/s3/S3Object';

import { Readable } from 'stream';
import { rejects } from 'assert';

describe('S3Object', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.s3 = () =>
      <any>{
        getObject: awsApiStub,
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('bucketName', 'key');
  });

  it('will check exists', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn();
    AwsApi.s3 = () =>
      <any>{
        headObject: awsApiStub,
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const exists = await sut.exists();

    expect(exists).toEqual(true);
    expect(awsApiStub).toHaveBeenCalledWith('bucketName', 'key');
  });

  it('will check exists when not exists', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockImplementation(() => {
      throw { statusCode: 404 };
    });
    AwsApi.s3 = () =>
      <any>{
        headObject: awsApiStub,
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const exists = await sut.exists();

    expect(exists).toEqual(false);
    expect(awsApiStub).toHaveBeenCalledWith('bucketName', 'key');
  });

  it('will throw on other error in exists', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockImplementation(() => {
      throw { statusCode: 403, message: 'unauthorized access' };
    });
    AwsApi.s3 = () =>
      <any>{
        headObject: awsApiStub,
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await rejects(() => sut.exists(), 'unauthorized');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        deleteObject: stubs.awsApiStub,
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.delete();

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith('bucketName', 'key');
  });

  it('will write S3Object', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        copyObject: stubs.awsApiStub,
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.writeS3Object(<any>{
      bucketName: 'sourceBucket',
      key: 'sourceKey',
    });

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'sourceBucket',
      'sourceKey',
      'bucketName',
      'key',
      undefined
    );
  });

  it('will write string', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        putObject: stubs.awsApiStub,
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.writeString('contents');

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'bucketName',
      'key',
      expect.any(Readable)
    );
  });

  it('will read string', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        getObject: stubs.awsApiStub.mockReturnValue({ Body: 'contents' }),
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const contents = await sut.readString();

    expect(contents).toEqual('contents');

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith('bucketName', 'key');
  });

  it('will read stream', async () => {
    const stubs = apiNodeCollectionStubs();
    const stream: Readable = <any>{};
    AwsApi.s3 = () =>
      <any>{
        getObjectStream: stubs.awsApiStub.mockReturnValue(stream),
      };

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const readStream = await sut.readStream();

    expect(readStream).toEqual(stream);

    expect(stubs.parentStub.ensureResolved).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith('bucketName', 'key');
  });
});
