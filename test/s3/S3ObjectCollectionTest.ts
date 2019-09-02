import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { S3ObjectCollection } from '../../src/s3/S3ObjectCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('S3ObjectCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Object = stubs.factoryStub;

    const sut = new S3ObjectCollection(<any>stubs.parentStub, 'bucketName');

    await sut.apiNodeFromId('id');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('bucketName');
    expect(stubs.factoryStub.args[0][2]).to.equal('id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.s3Object = stubs.factoryStub;
    const awsData: AWS.S3.Object = {
      Key: 'key'
    }

    const sut = new S3ObjectCollection(<any>stubs.parentStub, 'bucketName');

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('bucketName');
    expect(stubs.factoryStub.args[0][2]).to.equal('key');
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.s3.listObjects = stubs.awsApiStub.returns([{ ObjectName: 'bucket01' }, { ObjectName: 'bucket02' }]);

    const sut = new S3ObjectCollection(<any>stubs.parentStub, 'bucketName');
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('bucketName');
  });
});