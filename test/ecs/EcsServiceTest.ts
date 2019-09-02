import { apiNodeCollectionStubs } from "../utils/stubs";
import { EcsService } from "../../src/ecs/EcsService";
import { expect } from 'chai';
import { AwsApi } from "../../src/awsapi/AwsApi";
import * as sinon from 'sinon';

describe('EcsService', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.ecs.describeService = awsApiStub;

    const sut = new EcsService(<any>stubs.parentStub, 'clusterId', 'serviceId');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('clusterId');
  });

});