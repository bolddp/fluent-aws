import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { Route53 } from '../../src/route53/Route53';

describe('Route53', () => {
  it('will provide access to health checks', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HealthCheckCollection = stubs.factoryStub;

    const sut = new Route53(<any> stubs.parentStub);

    await sut.healthChecks().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a healthcheck', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HealthCheckCollection = stubs.factoryStub;

    const sut = new Route53(<any> stubs.parentStub);

    await sut.healthCheck('healthCheckId').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('healthCheckId');
  });

  it('will provide access to hosted zones', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HostedZoneCollection = stubs.factoryStub;

    const sut = new Route53(<any> stubs.parentStub);

    await sut.hostedZones().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a hosted zone', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HostedZoneCollection = stubs.factoryStub;

    const sut = new Route53(<any> stubs.parentStub);

    await sut.hostedZone('hostedZoneId').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('hostedZoneId');
  });
});