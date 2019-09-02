import * as sinon from 'sinon';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';
import { S3Object } from '../../src/s3/S3Object';
import { expect } from 'chai';
import { Readable } from 'stream';

describe('S3Object', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.s3.getObject = awsApiStub;

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('bucketName');
    expect(awsApiStub.args[0][1]).to.equal('key');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3.deleteObject = stubs.awsApiStub;

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    await sut.delete();

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
    expect(stubs.awsApiStub.args[0][1]).to.equal('key');
  });

  it('will write S3Object', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3.copyObject = stubs.awsApiStub;

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
    AwsApi.s3.putObject = stubs.awsApiStub;

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
    AwsApi.s3.getObject = stubs.awsApiStub.returns({ Body: 'contents' });

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
    AwsApi.s3.getObjectStream = stubs.awsApiStub.returns(stream);

    const sut = new S3Object(<any>stubs.parentStub, 'bucketName', 'key');
    const readStream = await sut.readStream();

    expect(readStream).to.equal(stream);

    expect(stubs.parentStub.ensureResolved.calledOnce).to.be.true;
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
    expect(stubs.awsApiStub.args[0][1]).to.equal('key');

  });
});