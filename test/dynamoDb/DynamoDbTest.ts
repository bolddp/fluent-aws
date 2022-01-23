import { DynamoDb } from './../../src/dynamoDb/DynamoDb';
import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from './../utils/stubs';

describe('DynamoDb', () => {
  it('will provide access to tables', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.dynamoDbTableCollection = stubs.factoryStub;

    const sut = new DynamoDb(<any>stubs.parentStub);

    await sut.tables().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a table', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.dynamoDbTableCollection = stubs.factoryStub;

    const sut = new DynamoDb(<any>stubs.parentStub);

    await sut.table('tableName').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('tableName');
  });
});
