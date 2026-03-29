export const apiNodeCollectionStubs = () => {
  const parentStub = {
    config: () => {},
    ensureResolved: jest.fn().mockResolvedValue(undefined)
  }
  const getByIdStub = jest.fn().mockReturnValue({
    ensureResolved: () => { return Promise.resolve(); }
  });
  const findByEmailStub = jest.fn().mockResolvedValue([]);
  const factoryStub = jest.fn().mockReturnValue({
    getById: getByIdStub,
    findByEmail: findByEmailStub,
    ensureResolved: () => { return Promise.resolve(); }
  });
  const awsApiStub = jest.fn();
  return {
    parentStub,
    factoryStub,
    getByIdStub,
    findByEmailStub,
    awsApiStub
  }
};


