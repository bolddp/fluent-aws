import { apiNodeCollectionStubs } from "../utils/stubs";
import { ApiNodeFactory } from "../../src/node/ApiNodeFactory";
import { EcsCluster } from "../../src/ecs/EcsCluster";
import { expect } from 'chai';
import { AwsApi } from "../../src/awsapi/AwsApi";
import * as sinon from 'sinon';

describe('EcsCluster', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.ecs.describeCluster = awsApiStub;

    const sut = new EcsCluster(<any> stubs.parentStub, 'clusterId');

    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('clusterId');
  });

  it('will provide access to tasks', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTaskCollection = stubs.factoryStub;
    const sut = new EcsCluster(<any> stubs.parentStub, 'clusterId');

    await sut.tasks().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a task', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTaskCollection = stubs.factoryStub;

    const sut = new EcsCluster(<any> stubs.parentStub, 'clusterId');

    await sut.task('taskId').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('taskId');
  });

  it('will provide access to services', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsServiceCollection = stubs.factoryStub;

    const sut = new EcsCluster(<any> stubs.parentStub, 'clusterId');

    await sut.services().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a service', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsServiceCollection = stubs.factoryStub;

    const sut = new EcsCluster(<any> stubs.parentStub, 'clusterId');

    await sut.service('serviceId').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('serviceId');
  });

});