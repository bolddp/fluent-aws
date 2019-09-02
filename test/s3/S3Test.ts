import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { S3 } from '../../src/s3/S3';

describe('S3', () => {
  it('will provide access to buckets', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3BucketCollection = stubs.factoryStub;

    const sut = new S3(<any> stubs.parentStub);

    await sut.buckets().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a bucket', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3BucketCollection = stubs.factoryStub;

    const sut = new S3(<any> stubs.parentStub);

    await sut.bucket('bucketName').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('bucketName');
  });
});