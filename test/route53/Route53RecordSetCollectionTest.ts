import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Route53RecordSetCollection } from '../../src/route53/Route53RecordSetCollection';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('Route53RecordSetCollection', () => {
  it('will load AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53.listRecordSets = stubs.awsApiStub;

    const sut = new Route53RecordSetCollection(<any>stubs.parentStub, 'hostedZoneId');
    await sut.loadAwsData();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });

  it('will create record set', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53.createRecordSet = stubs.awsApiStub;

    const sut = new Route53RecordSetCollection(<any>stubs.parentStub, 'hostedZoneId');
    await sut.create(<any> { Name: 'dnsName' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('hostedZoneId');
    expect(stubs.awsApiStub.args[0][1].Name).to.equal('dnsName');
  });

  it('will delete record set', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53.deleteRecordSet = stubs.awsApiStub;

    const sut = new Route53RecordSetCollection(<any>stubs.parentStub, 'hostedZoneId');
    await sut.delete(<any> { Name: 'dnsName' });

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('hostedZoneId');
    expect(stubs.awsApiStub.args[0][1].Name).to.equal('dnsName');
  });
});