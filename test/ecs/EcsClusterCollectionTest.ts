import { expect } from 'chai';
import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';
import { EcsClusterCollection } from './../../src/ecs/EcsClusterCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('EcsClusterCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsCluster = stubs.factoryStub;

    const sut = new EcsClusterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('id');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('id');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsCluster = stubs.factoryStub;
    const awsData: AWS.ECS.Cluster = {
      clusterArn: 'clusterId'
    }

    const sut = new EcsClusterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('clusterId');
  })

  it('will load', async () => {
    const stubs01 = apiNodeCollectionStubs();
    const stubs02 = apiNodeCollectionStubs();
    AwsApi.ecs = () => (<any>{
      listClusters: stubs01.awsApiStub.returns(['clusterId01', 'clusterId02']),
      describeClusters: stubs02.awsApiStub.returns([{ clusterName: 'name01' }, { clusterName: 'name02' }])
    });

    const sut = new EcsClusterCollection(<any>stubs01.parentStub);

    await sut.load();

    expect(stubs01.awsApiStub.calledOnce).to.be.true;
    expect(stubs02.awsApiStub.calledOnce).to.be.true;
    expect(stubs02.awsApiStub.args[0][0]).to.eql(['clusterId01', 'clusterId02']);
  });
});