import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { S3BucketCollection } from '../../src/s3/S3BucketCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('S3BucketCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Bucket = stubs.factoryStub;

    const sut = new S3BucketCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('id');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Bucket = stubs.factoryStub;
    const awsData: AWS.S3.Bucket = {
      Name: 'bucketName',
    };

    const sut = new S3BucketCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'bucketName');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () =>
      <any>{
        listBuckets: stubs.awsApiStub.mockReturnValue([
          { BucketName: 'bucket01' },
          { BucketName: 'bucket02' },
        ]),
      };

    const sut = new S3BucketCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });
});
