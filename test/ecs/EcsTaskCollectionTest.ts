import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { EcsTaskCollection } from '../../src/ecs/EcsTaskCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('EcsTaskCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTask = stubs.factoryStub;

    const sut = new EcsTaskCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromId('taskArn');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'clusterId', 'taskArn');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTask = stubs.factoryStub;
    const awsData: AWS.ECS.Task = {
      taskArn: 'taskArn',
    };

    const sut = new EcsTaskCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'clusterId', 'taskArn');
  });

  it('will load', async () => {
    const stubs01 = apiNodeCollectionStubs();
    const stubs02 = apiNodeCollectionStubs();
    AwsApi.ecs = () =>
      <any>{
        listTasks: stubs01.awsApiStub.mockReturnValue([
          'taskArn01',
          'taskArn02',
        ]),
        describeTasks: stubs02.awsApiStub.mockReturnValue([
          { taskArn: 'arn01' },
          { taskArn: 'arn02' },
        ]),
      };

    const sut = new EcsTaskCollection(<any>stubs01.parentStub, 'clusterId');

    await sut.load();

    expect(stubs01.awsApiStub).toHaveBeenCalled();
    expect(stubs02.awsApiStub).toHaveBeenCalledWith('clusterId', [
      'taskArn01',
      'taskArn02',
    ]);
  });
});
