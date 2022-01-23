import { apiNodeCollectionStubs } from '../utils/stubs';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { EcsTask } from '../../src/ecs/EcsTask';

import { AwsApi } from '../../src/awsapi/AwsApi';
import { Ec2Instance } from '../../src/ec2/Ec2Instance';

describe('EcsTask', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.ecs = () =>
      <any>{
        describeTask: awsApiStub,
      };

    const sut = new EcsTask(<any>stubs.parentStub, 'clusterId', 'taskId');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('clusterId', 'taskId');
  });

  it('will provide EC2 instance', async () => {
    const stubs = apiNodeCollectionStubs();
    const stubs02 = apiNodeCollectionStubs();
    const sut = new EcsTask(<any>stubs.parentStub, 'clusterId', 'taskId');

    AwsApi.ec2 = () =>
      <any>{
        describeInstance: () => {},
      };
    AwsApi.ecs = () =>
      <any>{
        describeTask: stubs.awsApiStub.mockReturnValue({
          containerInstanceArn: 'containerInstanceArn',
        }),
        describeContainerInstance: stubs02.awsApiStub.mockReturnValue({
          ec2InstanceId: 'instanceId',
        }),
      };

    const ec2Instance = new Ec2Instance(sut, undefined);
    ApiNodeFactory.ec2Instance = stubs.factoryStub.mockReturnValue(ec2Instance);

    await sut.ec2Instance().awsData();
    expect(ec2Instance.instanceId).toEqual('instanceId');
  });
});
