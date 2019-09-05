import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { EcsServiceCollection } from '../../src/ecs/EcsServiceCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('EcsServiceCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsService = stubs.factoryStub;

    const sut = new EcsServiceCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromId('serviceArn');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('clusterId');
    expect(stubs.factoryStub.args[0][2]).to.equal('serviceArn');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsService = stubs.factoryStub;
    const awsData: AWS.ECS.Service = {
      serviceName: 'serviceName'
    }

    const sut = new EcsServiceCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('clusterId');
    expect(stubs.factoryStub.args[0][2]).to.equal('serviceName');
  })

  it('will load', async () => {
    const stubs01 = apiNodeCollectionStubs();
    const stubs02 = apiNodeCollectionStubs();
    AwsApi.ecs.listServices = stubs01.awsApiStub.returns(['serviceArn01', 'serviceArn02']);
    AwsApi.ecs.describeServices = stubs02.awsApiStub.returns([{ serviceArn: 'arn01' }, { serviceArn: 'arn02' }]);

    const sut = new EcsServiceCollection(<any>stubs01.parentStub, 'clusterId');

    await sut.load();

    expect(stubs01.awsApiStub.calledOnce).to.be.true;
    expect(stubs02.awsApiStub.calledOnce).to.be.true;
    expect(stubs02.awsApiStub.args[0][0]).to.equal('clusterId');
    expect(stubs02.awsApiStub.args[0][1]).to.eql(['serviceArn01', 'serviceArn02']);
  });
});