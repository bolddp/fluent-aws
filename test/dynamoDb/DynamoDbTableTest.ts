import { expect } from 'chai';
import { DynamoDbTable } from './../../src/dynamoDb/DynamoDbTable';
import * as sinon from 'sinon';
import { AwsApi } from './../../src/awsapi/AwsApi';
import { apiNodeCollectionStubs } from './../utils/stubs';
import { aws } from '../../src/FluentAws';

describe('DynamoDbTable', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.dynamoDb.describeTable = awsApiStub;

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('tableName');
  });

  it('will get', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb.get = stubs.awsApiStub;

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    const item = await sut.get({ key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.eql({ TableName: 'tableName', Key: { key: 'key' } });
  });

  it('will put', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb.put = stubs.awsApiStub;

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    await sut.put({ key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('tableName');
    expect(stubs.awsApiStub.args[0][1].key).to.equal('key');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb.delete = stubs.awsApiStub;

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    await sut.delete({ key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('tableName');
    expect(stubs.awsApiStub.args[0][1].key).to.equal('key');
  });
});