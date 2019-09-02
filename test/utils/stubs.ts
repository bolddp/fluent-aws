import * as sinon from 'sinon';
import { ApiNode } from '../../src/node/ApiNode';

export const apiNodeCollectionStubs = () => {
  const parentStub = {
    ensureResolved: sinon.stub().returns(Promise.resolve())
  }
  const getByIdStub = sinon.stub().returns({
    ensureResolved: () => { return Promise.resolve(); }
  });
  const factoryStub = sinon.stub().returns({
    getById: getByIdStub,
    ensureResolved: () => { return Promise.resolve(); }
  });
  const awsApiStub = sinon.stub();
  return {
    parentStub,
    factoryStub,
    getByIdStub,
    awsApiStub
  }
};


