import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { AutoScalingGroupCollection } from '../../src/autoScaling/AutoScalingGroupCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { AutoScalingGroup } from '@aws-sdk/client-auto-scaling';

describe('AutoScalingGroupCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroup = stubs.factoryStub;

    const sut = new AutoScalingGroupCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('groupName');

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'groupName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroup = stubs.factoryStub;
    const awsData: AutoScalingGroup = <any>{
      AutoScalingGroupName: 'groupName',
    };

    const sut = new AutoScalingGroupCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'groupName');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.autoScaling = () =>
      <any>{
        describeGroups: stubs.awsApiStub,
      };

    const sut = new AutoScalingGroupCollection(<any>stubs.parentStub);

    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });
});
