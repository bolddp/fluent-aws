export const apiNodeCollectionStubs = () => {
  const parentStub = {
    config: () => {},
    ensureResolved: jest.fn().mockResolvedValue(undefined)
  }
  const getByIdStub = jest.fn().mockReturnValue({
    ensureResolved: () => { return Promise.resolve(); }
  });
  const factoryStub = jest.fn().mockReturnValue({
    getById: getByIdStub,
    ensureResolved: () => { return Promise.resolve(); }
  });
  const awsApiStub = jest.fn();
  return {
    parentStub,
    factoryStub,
    getByIdStub,
    awsApiStub
  }
};


