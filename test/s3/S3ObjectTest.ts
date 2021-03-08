import * as sinon from 'sinon';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';
import { S3Object } from '../../src/s3/S3Object';
import { expect } from 'chai';
import { Readable } from 'stream';
import { rejects } from 'assert';

describe('S3Object', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.s3 = () => (<any>{
      getObject: awsApiStub
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('bucketName');
    expect(awsApiStub.args[0][1]).to.equal('key');
  });

  it('will check exists', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub();
    AwsApi.s3 = () => (<any>{
      headObject: awsApiStub
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const exists = await sut.exists();

    expect(exists).to.be.true;
    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('bucketName');
    expect(awsApiStub.args[0][1]).to.equal('key');
  });

  it('will check exists when not exists', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().throws({ statusCode: 404 });
    AwsApi.s3 = () => (<any>{
      headObject: awsApiStub
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const exists = await sut.exists();

    expect(exists).to.be.false;
    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('bucketName');
    expect(awsApiStub.args[0][1]).to.equal('key');
  });

  it('will throw on other error in exists', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().throws({ statusCode: 403, message: 'unauthorized access' });
    AwsApi.s3 = () => (<any>{
      headObject: awsApiStub
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await rejects(() => sut.exists(), 'unauthorized');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      deleteObject: stubs.awsApiStub
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.delete();

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
    expect(stubs.awsApiStub.args[0][1]).to.equal('key');
  });

  it('will write S3Object', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      copyObject: stubs.awsApiStub
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.writeS3Object(<any> { bucketName: 'sourceBucket', key: 'sourceKey'});

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('sourceBucket');
    expect(stubs.awsApiStub.args[0][1]).to.equal('sourceKey');
    expect(stubs.awsApiStub.args[0][2]).to.equal('bucketName');
    expect(stubs.awsApiStub.args[0][3]).to.equal('key');
  });

  it('will write string', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      putObject: stubs.awsApiStub
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.writeString('contents');

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
    expect(stubs.awsApiStub.args[0][1]).to.equal('key');
    expect(stubs.awsApiStub.args[0][2]).to.equal('contents');
  });

  it('will read string', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3 = () => (<any>{
      getObject: stubs.awsApiStub.returns({ Body: 'contents' })
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const contents = await sut.readString();

    expect(contents).to.equal('contents');

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
    expect(stubs.awsApiStub.args[0][1]).to.equal('key');
  });

  it('will read stream', async () => {
    const stubs = apiNodeCollectionStubs();
    const stream: Readable = <any> {};
    AwsApi.s3 = () => (<any>{
      getObjectStream: stubs.awsApiStub.returns(stream)
    });

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const readStream = await sut.readStream();

    expect(readStream).to.equal(stream);

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
    expect(stubs.awsApiStub.args[0][1]).to.equal('key');
  });
});