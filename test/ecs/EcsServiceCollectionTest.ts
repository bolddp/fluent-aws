import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { EcsServiceCollection } from '../../src/ecs/EcsServiceCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('EcsServiceCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsService = stubs.factoryStub;

    const sut = new EcsServiceCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromId('serviceArn');

    expect(stubs.factoryStub).toHaveBeenCalledWith(
      sut,
      'clusterId',
      'serviceArn'
    );
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsService = stubs.factoryStub;
    const awsData: AWS.ECS.Service = {
      serviceName: 'serviceName',
    };

    const sut = new EcsServiceCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(
      sut,
      'clusterId',
      'serviceName'
    );
  });

  it('will load', async () => {
    const stubs01 = apiNodeCollectionStubs();
    const stubs02 = apiNodeCollectionStubs();
    AwsApi.ecs = () =>
      <any>{
        listServices: stubs01.awsApiStub.mockReturnValue([
          'serviceArn01',
          'serviceArn02',
        ]),
        describeServices: stubs02.awsApiStub.mockReturnValue([
          { serviceArn: 'arn01' },
          { serviceArn: 'arn02' },
        ]),
      };

    const sut = new EcsServiceCollection(<any>stubs01.parentStub, 'clusterId');

    await sut.load();

    expect(stubs01.awsApiStub).toHaveBeenCalled();
    expect(stubs02.awsApiStub).toHaveBeenCalledWith('clusterId', [
      'serviceArn01',
      'serviceArn02',
    ]);
  });
});
