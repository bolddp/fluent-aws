import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { AutoScalingGroup } from '../../src/autoScaling/AutoScalingGroup';

import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Ec2InstanceCollection } from '../../src/ec2/Ec2InstanceCollection';

describe('AutoScalingGroup', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.autoScaling = () =>
      <any>{
        describeGroup: awsApiStub,
      };

    const sut = new AutoScalingGroup(<any>stubs.parentStub, 'name');

    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('name');
  });

  it('will provide ec2Instances', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new AutoScalingGroup(<any>stubs.parentStub, 'name');

    AwsApi.autoScaling = () =>
      <any>{
        describeGroup: stubs.awsApiStub.mockReturnValue({
          Instances: [
            { InstanceId: 'instanceId01' },
            { InstanceId: 'instanceId02' },
          ],
        }),
      };
    const ec2InstanceCollection = new Ec2InstanceCollection(sut);
    ApiNodeFactory.ec2InstanceCollection = stubs.factoryStub.mockReturnValue(
      ec2InstanceCollection
    );
    AwsApi.ec2 = () =>
      <any>{
        describeInstances: apiNodeCollectionStubs().awsApiStub.mockReturnValue(
          []
        ),
      };

    await sut.ec2Instances().ensureResolved();

    expect(ec2InstanceCollection.instanceIds).toEqual([
      'instanceId01',
      'instanceId02',
    ]);
  });

  it('will set instance protection', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.autoScaling = () =>
      <any>{
        setInstanceProtection: stubs.awsApiStub,
      };

    const sut = new AutoScalingGroup(<any>stubs.parentStub, 'groupName');
    await sut.setInstanceProtection(['id01', 'id02'], true);

    expect(stubs.awsApiStub).toHaveBeenCalled();
    expect(stubs.awsApiStub).toHaveBeenCalledWith(
      'groupName',
      ['id01', 'id02'],
      true
    );
  });

  it('will update size', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.autoScaling = () =>
      <any>{
        update: stubs.awsApiStub,
      };

    const sut = new AutoScalingGroup(<any>stubs.parentStub, 'groupName');
    await sut.updateSize(10, 20, 15);

    expect(stubs.awsApiStub).toHaveBeenCalledWith({
      AutoScalingGroupName: 'groupName',
      MinSize: 10,
      MaxSize: 20,
      DesiredCapacity: 15,
    });
  });
});
