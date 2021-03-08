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
    AwsApi.dynamoDb = () => (<any>{
      describeTable: awsApiStub
    });

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('tableName');
  });

  it('will query', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb = () => (<any>{
      query: stubs.awsApiStub
    });

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    const result = await sut.query({ key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.eql({
      TableName: "tableName",
      KeyConditionExpression: "key = :key",
      ExpressionAttributeValues: {
        ':key': "key"
      }
    });
  });

  it('will query by index', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb = () => (<any>{
      query: stubs.awsApiStub
    });

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    const result = await sut.queryByIndex('index', { key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.eql({
      TableName: 'tableName',
      IndexName: 'index',
      KeyConditionExpression: 'key = :key',
      ExpressionAttributeValues: {
        ':key': 'key'
      }
    });
  });

  it('will get', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb = () => (<any>{
      get: stubs.awsApiStub
    });

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    const item = await sut.get({ key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.eql({ TableName: 'tableName', Key: { key: 'key' } });
  });

  it('will put', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb = () => (<any>{
      put: stubs.awsApiStub
    });

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    await sut.put({ key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('tableName');
    expect(stubs.awsApiStub.args[0][1].key).to.equal('key');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb = () => (<any>{
      delete: stubs.awsApiStub
    });

    const sut = new DynamoDbTable(<any>stubs.parentStub, 'tableName');
    await sut.delete({ key: 'key' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('tableName');
    expect(stubs.awsApiStub.args[0][1].key).to.equal('key');
  });
});