import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Ec2InstanceCollection } from '../../src/ec2/Ec2InstanceCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { Instance } from '@aws-sdk/client-ec2';

describe('Ec2InstanceCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ec2Instance = stubs.factoryStub;

    const sut = new Ec2InstanceCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('id');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ec2Instance = stubs.factoryStub;
    const awsData: Instance = {
      InstanceId: 'instanceId',
    };

    const sut = new Ec2InstanceCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'instanceId');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.ec2 = () =>
      <any>{
        describeInstances: stubs.awsApiStub.mockReturnValue([
          { InstanceId: 'instanceId01' },
          { InstanceId: 'instanceId02' },
        ]),
      };

    const sut = new Ec2InstanceCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });

  it('will load with predefined ids', async () => {
    const stubs01 = apiNodeCollectionStubs();
    AwsApi.ec2 = () =>
      <any>{
        describeInstances: stubs01.awsApiStub.mockReturnValue([
          { InstanceId: 'instanceId01' },
          { InstanceId: 'instanceId02' },
        ]),
      };

    const sut = new Ec2InstanceCollection(<any>stubs01.parentStub);
    sut.instanceIds = ['instanceId01', 'instanceId02'];

    await sut.load();

    expect(stubs01.awsApiStub).toHaveBeenCalledWith([
      'instanceId01',
      'instanceId02',
    ]);
  });
});
