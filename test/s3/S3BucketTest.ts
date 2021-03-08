import * as sinon from 'sinon';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { S3Bucket } from '../../src/s3/S3Bucket';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';

describe('S3Bucket', () => {
  it('will return true if bucket exists', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      headBucket: stubs.awsApiStub.returns({})
    });
    const sut = new S3Bucket(<any> stubs.parentStub, 'bucketName');

    const exists = await sut.exists();
    expect(exists).to.be.true;
  });

  it('will return false if bucket does not exist', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      headBucket: stubs.awsApiStub.throws({ statusCode: 404 })
    });
    const sut = new S3Bucket(<any> stubs.parentStub, 'bucketName');

    const exists = await sut.exists();
    expect(exists).to.be.false;
  });

  it('will rethrow error if statusCode != 404', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      headBucket: stubs.awsApiStub.throws({ statusCode: 403 })
    });
    const sut = new S3Bucket(<any> stubs.parentStub, 'bucketName');
    // Promise should be rejected
    let wasRejected = false;
    await sut.exists()
      .catch(() => wasRejected = true);
    expect(wasRejected).to.be.true;
  });

  it('will create bucket if it does not exist', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      headBucket: sinon.stub().throws({ statusCode: 404 }),
      createBucket: stubs.awsApiStub
    });

    const sut = new S3Bucket(<any> stubs.parentStub, 'bucketName');
    await sut.createIfNotExists().ensureResolved();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
  });

  it('will provide access to objects', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3ObjectCollection = stubs.factoryStub;

    const sut = new S3Bucket(<any> stubs.parentStub, 'bucketName');
    await sut.objects().ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to an object', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3ObjectCollection = stubs.factoryStub;

    const sut = new S3Bucket(<any> stubs.parentStub, 'bucketName');

    await sut.object('key').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('key');
  });


});