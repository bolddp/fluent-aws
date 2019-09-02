import { expect } from 'chai';
import { DynamoDb } from './../../src/dynamoDb/DynamoDb';
import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from './../utils/stubs';

describe('DynamoDb', () => {
  it('will provide access to tables', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.dynamoDbTableCollection = stubs.factoryStub;

    const sut = new DynamoDb(<any> stubs.parentStub);

    await sut.tables().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a table', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.dynamoDbTableCollection = stubs.factoryStub;

    const sut = new DynamoDb(<any> stubs.parentStub);

    await sut.table('tableName').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('tableName');
  });
});