import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';
import { expect } from 'chai';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from "../../src/awsapi/AwsApi";
import { Route53HostedZone } from '../../src/route53/Route53HostedZone';

describe('Route53HostedZone', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53.getHostedZone = stubs.awsApiStub;

    const sut = new Route53HostedZone(<any>stubs.parentStub, 'zoneId');
    await sut.loadAwsData();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('zoneId');
  });

  it('will provide record sets', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53RecordSetCollection = stubs.factoryStub;

    const sut = new Route53HostedZone(<any>stubs.parentStub, 'zoneId');
    sut.recordSets();

    expect(stubs.factoryStub.calledOnce).to.be.true;
  });
});