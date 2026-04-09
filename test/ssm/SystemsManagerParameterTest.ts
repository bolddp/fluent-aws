import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { SystemsManagerParameter } from '../../src/ssm/SystemsManagerParameter';

describe('SystemsManagerParameter', () => {
  it('will load AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager = () =>
      <any>{
        getParameter: stubs.awsApiStub,
      };

    const sut = new SystemsManagerParameter(
      <any>stubs.parentStub,
      'parameterName'
    );
    await sut.loadAwsData();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('parameterName');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager = () =>
      <any>{
        deleteParameter: stubs.awsApiStub,
      };

    const sut = new SystemsManagerParameter(
      <any>stubs.parentStub,
      'parameterName'
    );
    await sut.delete();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('parameterName');
  });

  it('will provide metadata', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager = () =>
      <any>{
        describeParameter: stubs.awsApiStub,
      };

    const sut = new SystemsManagerParameter(
      <any>stubs.parentStub,
      'parameterName'
    );
    await sut.metaData();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('parameterName');
  });
});
