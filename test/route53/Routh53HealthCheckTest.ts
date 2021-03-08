import { apiNodeCollectionStubs } from "../utils/stubs";
import { Route53HealthCheck } from "../../src/route53/Route53HealthCheck";
import { expect } from 'chai';
import { AwsApi } from "../../src/awsapi/AwsApi";
import * as sinon from 'sinon';

describe('Route53HealthCheck', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.route53 = () => (<any>{
      getHealthCheck: awsApiStub
    });

    const sut = new Route53HealthCheck(<any>stubs.parentStub, 'id');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('id');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new Route53HealthCheck(<any>stubs.parentStub, 'id');

    AwsApi.route53 = () => (<any>{
      deleteHealthCheck: stubs.awsApiStub
    });

    await sut.delete();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('id');
  });
});