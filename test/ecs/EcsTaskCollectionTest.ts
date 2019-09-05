import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { EcsTaskCollection } from '../../src/ecs/EcsTaskCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('EcsTaskCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTask = stubs.factoryStub;

    const sut = new EcsTaskCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromId('taskArn');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('clusterId');
    expect(stubs.factoryStub.args[0][2]).to.equal('taskArn');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ecsTask = stubs.factoryStub;
    const awsData: AWS.ECS.Task = {
      taskArn: 'taskArn'
    }

    const sut = new EcsTaskCollection(<any>stubs.parentStub, 'clusterId');

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('clusterId');
    expect(stubs.factoryStub.args[0][2]).to.equal('taskArn');
  })

  it('will load', async () => {
    const stubs01 = apiNodeCollectionStubs();
    const stubs02 = apiNodeCollectionStubs();
    AwsApi.ecs.listTasks = stubs01.awsApiStub.returns(['taskArn01', 'taskArn02']);
    AwsApi.ecs.describeTasks = stubs02.awsApiStub.returns([{ taskArn: 'arn01' }, { taskArn: 'arn02' }]);

    const sut = new EcsTaskCollection(<any>stubs01.parentStub, 'clusterId');

    await sut.load();

    expect(stubs01.awsApiStub.calledOnce).to.be.true;
    expect(stubs02.awsApiStub.calledOnce).to.be.true;
    expect(stubs02.awsApiStub.args[0][0]).to.equal('clusterId');
    expect(stubs02.awsApiStub.args[0][1]).to.eql(['taskArn01', 'taskArn02']);
  });
});