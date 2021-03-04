import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { AutoScalingGroupCollection } from '../../src/autoScaling/AutoScalingGroupCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('AutoScalingGroupCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroup = stubs.factoryStub;

    const sut = new AutoScalingGroupCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('groupName');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('groupName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.autoScalingGroup = stubs.factoryStub;
    const awsData: AWS.AutoScaling.AutoScalingGroup = <any> {
      AutoScalingGroupName: 'groupName'
    }

    const sut = new AutoScalingGroupCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('groupName');
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.autoScaling = () => (<any>{
      describeGroups: stubs.awsApiStub
    });

    const sut = new AutoScalingGroupCollection(<any>stubs.parentStub);

    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });
});