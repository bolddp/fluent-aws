import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Ec2InstanceCollection } from '../../src/ec2/Ec2InstanceCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('Ec2InstanceCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ec2Instance = stubs.factoryStub;

    const sut = new Ec2InstanceCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('id');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ec2Instance = stubs.factoryStub;
    const awsData: AWS.EC2.Instance = {
      InstanceId: 'instanceId'
    }

    const sut = new Ec2InstanceCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('instanceId');
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.ec2 = () => (<any>{
      describeInstances: stubs.awsApiStub.returns([{ InstanceId: 'instanceId01' }, { InstanceId: 'instanceId02' }])
    });

    const sut = new Ec2InstanceCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });

  it('will load with predefined ids', async () => {
    const stubs01 = apiNodeCollectionStubs();
    AwsApi.ec2 = () => (<any>{
      describeInstances: stubs01.awsApiStub.returns([{ InstanceId: 'instanceId01' }, { InstanceId: 'instanceId02' }])
    });

    const sut = new Ec2InstanceCollection(<any>stubs01.parentStub);
    sut.instanceIds = ['instanceId01', 'instanceId02'];

    await sut.load();

    expect(stubs01.awsApiStub.calledOnce).to.be.true;
    expect(stubs01.awsApiStub.args[0][0]).to.eql(['instanceId01', 'instanceId02']);
  });
});