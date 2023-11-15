import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';
import { EcsClusterCollection } from './../../src/ecs/EcsClusterCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { Cluster } from '@aws-sdk/client-ecs';

describe('EcsClusterCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsCluster = stubs.factoryStub;

    const sut = new EcsClusterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('id');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsCluster = stubs.factoryStub;
    const awsData: Cluster = {
      clusterArn: 'clusterId',
    };

    const sut = new EcsClusterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'clusterId');
  });

  it('will load', async () => {
    const stubs01 = apiNodeCollectionStubs();
    const stubs02 = apiNodeCollectionStubs();
    AwsApi.ecs = () =>
      <any>{
        listClusters: stubs01.awsApiStub.mockReturnValue([
          'clusterId01',
          'clusterId02',
        ]),
        describeClusters: stubs02.awsApiStub.mockReturnValue([
          { clusterName: 'name01' },
          { clusterName: 'name02' },
        ]),
      };

    const sut = new EcsClusterCollection(<any>stubs01.parentStub);

    await sut.load();

    expect(stubs01.awsApiStub).toHaveBeenCalled();
    expect(stubs02.awsApiStub).toHaveBeenCalledWith([
      'clusterId01',
      'clusterId02',
    ]);
  });
});
