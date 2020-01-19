import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { Cognito } from '../../src/cognito/Cognito';

describe('Cognito', () => {
  it('will provide access to a user pool', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cognitoUserPoolCollection = stubs.factoryStub;

    const sut = new Cognito(<any>stubs.parentStub);
    await sut.userPool({ poolId: 'poolId', clientId: 'clientId' }).ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('poolId/clientId');
  });
});