import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { S3BucketCollection } from '../../src/s3/S3BucketCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('S3BucketCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Bucket = stubs.factoryStub;

    const sut = new S3BucketCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('id');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Bucket = stubs.factoryStub;
    const awsData: AWS.S3.Bucket = {
      Name: 'bucketName'
    }

    const sut = new S3BucketCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('bucketName');
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3.listBuckets = stubs.awsApiStub.returns([{ BucketName: 'bucket01' }, { BucketName: 'bucket02' }]);

    const sut = new S3BucketCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });
});