import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { S3ObjectCollection } from '../../src/s3/S3ObjectCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { _Object } from '@aws-sdk/client-s3';

describe('S3ObjectCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Object = stubs.factoryStub;

    const sut = new S3ObjectCollection(<any>stubs.parentStub, 'bucketName');

    await sut.apiNodeFromId('id');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'bucketName', 'id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Object = stubs.factoryStub;
    const awsData: _Object = {
      Key: 'key',
    };

    const sut = new S3ObjectCollection(<any>stubs.parentStub, 'bucketName');

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'bucketName', 'key');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        listObjects: stubs.awsApiStub.mockReturnValue([
          { ObjectName: 'bucket01' },
          { ObjectName: 'bucket02' },
        ]),
      };

    const sut = new S3ObjectCollection(<any>stubs.parentStub, 'bucketName');
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('bucketName', undefined);
  });
});
