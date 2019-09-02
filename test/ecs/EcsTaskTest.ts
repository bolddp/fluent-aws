import { apiNodeCollectionStubs } from "../utils/stubs";
import { ApiNodeFactory } from "../../src/node/ApiNodeFactory";
import { EcsTask } from "../../src/ecs/EcsTask";
import { expect } from 'chai';
import { AwsApi } from "../../src/awsapi/AwsApi";
import * as sinon from 'sinon';
import { Ec2Instance } from "../../src/ec2/Ec2Instance";

describe('EcsTask', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.ecs.describeTask = awsApiStub;

    const sut = new EcsTask(<any>stubs.parentStub, 'clusterId', 'taskId');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('clusterId');
  });

  it('will provide EC2 instance', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new EcsTask(<any>stubs.parentStub, 'clusterId', 'taskId');

    const ec2Instance = new Ec2Instance(sut, undefined);
    ApiNodeFactory.ec2Instance = stubs.factoryStub.returns(ec2Instance);

    AwsApi.ecs.describeTask = stubs.awsApiStub.returns({
      containerInstanceArn: 'containerInstanceArn'
    })

    const stubs02 = apiNodeCollectionStubs();
    AwsApi.ecs.describeContainerInstance = stubs02.awsApiStub.returns({
      ec2InstanceId: 'instanceId'
    })

    await sut.ec2Instance().awsData();
    expect(ec2Instance.instanceId).to.equal('instanceId');
  });

});