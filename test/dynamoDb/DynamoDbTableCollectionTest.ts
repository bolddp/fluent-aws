import { AwsApi } from './../../src/awsapi/AwsApi';
import { expect } from 'chai';
import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from './../utils/stubs';
import { DynamoDbTableCollection } from '../../src/dynamoDb/DynamoDbTableCollection';
describe('DynamoDbTableCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.dynamoDbTable = stubs.factoryStub;

    const sut = new DynamoDbTableCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('tableName');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('tableName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.dynamoDbTable = stubs.factoryStub;
    const awsData: string = 'tableName';

    const sut = new DynamoDbTableCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('tableName');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.dynamoDb = () => (<any>{
      listTableNames: stubs.awsApiStub
    });

    const sut = new DynamoDbTableCollection(<any>stubs.parentStub);

    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });
});