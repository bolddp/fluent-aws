import { apiNodeCollectionStubs } from '../utils/stubs';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { EcsCluster } from '../../src/ecs/EcsCluster';

import { AwsApi } from '../../src/awsapi/AwsApi';

describe('EcsCluster', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.ecs = () =>
      <any>{
        describeCluster: awsApiStub,
      };

    const sut = new EcsCluster(<any>stubs.parentStub, 'clusterId');

    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('clusterId');
  });

  it('will provide access to tasks', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTaskCollection = stubs.factoryStub;
    const sut = new EcsCluster(<any>stubs.parentStub, 'clusterId');

    await sut.tasks().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a task', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTaskCollection = stubs.factoryStub;

    const sut = new EcsCluster(<any>stubs.parentStub, 'clusterId');

    await sut.task('taskId').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('taskId');
  });

  it('will provide access to services', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsServiceCollection = stubs.factoryStub;

    const sut = new EcsCluster(<any>stubs.parentStub, 'clusterId');

    await sut.services().ensureResolved();
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a service', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsServiceCollection = stubs.factoryStub;

    const sut = new EcsCluster(<any>stubs.parentStub, 'clusterId');

    await sut.service('serviceId').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('serviceId');
  });
});
