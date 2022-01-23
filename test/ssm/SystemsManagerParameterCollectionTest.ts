import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { SystemsManagerParameterCollection } from '../../src/ssm/SystemsManagerParameterCollection';

import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';

describe('SystemsManagerParameterCollection', () => {
  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    // 12 parameters will force 2 loads, since only 10 parameters at a time can be fetched

    // For simplicity we return 2 instead of 10
    const getParametersStub = jest
      .fn()
      .mockReturnValue([{ Name: 'parameter01' }, { Name: 'parameter02' }]);

    AwsApi.systemsManager = () =>
      <any>{
        describeParameters: stubs.awsApiStub.mockReturnValue([
          { Name: 'parameter01' },
          { Name: 'parameter02' },
          { Name: 'parameter03' },
          { Name: 'parameter04' },
          { Name: 'parameter05' },
          { Name: 'parameter06' },
          { Name: 'parameter07' },
          { Name: 'parameter08' },
          { Name: 'parameter09' },
          { Name: 'parameter10' },
          { Name: 'parameter11' },
          { Name: 'parameter12' },
        ]),
        getParameters: getParametersStub,
      };

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);
    const parameters = await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
    expect(getParametersStub).toHaveBeenCalledTimes(2);
    expect(parameters.length).toEqual(4); // 2 calls times 2 returned parameters
  });

  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameter = stubs.factoryStub;

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('parameterName');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'parameterName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameter = stubs.factoryStub;
    const awsData: AWS.SSM.Parameter = <any>(<unknown>{
      Name: 'parameterName',
    });

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'parameterName');
  });

  it('will provide metadata', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager = () =>
      <any>{
        describeParameters: stubs.awsApiStub,
      };

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);
    await sut.metaData();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });

  it('will put parameter', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager = () =>
      <any>{
        putParameter: stubs.awsApiStub,
      };

    const request: AWS.SSM.PutParameterRequest = {
      Name: 'name',
      Value: 'value',
      Type: 'String',
    };

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);
    await sut.put(request);

    expect(stubs.awsApiStub).toHaveBeenCalledWith(request);
  });
});
