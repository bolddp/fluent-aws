import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Route53HealthCheckCollection } from '../../src/route53/Route53HealthCheckCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('Route53HealthCheckCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HealthCheck = stubs.factoryStub;

    const sut = new Route53HealthCheckCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('healthCheckId');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'healthCheckId');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HealthCheck = stubs.factoryStub;
    const awsData: AWS.Route53.HealthCheck = <any>{
      Id: 'healthCheckId',
    };

    const sut = new Route53HealthCheckCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'healthCheckId');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53 = () =>
      <any>{
        listHealthChecks: stubs.awsApiStub,
      };

    const sut = new Route53HealthCheckCollection(<any>stubs.parentStub);

    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });

  it('will create health check', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53 = () =>
      <any>{
        createHealthCheck: stubs.awsApiStub.mockReturnValue({
          Id: 'healthCheckId',
        }),
      };
    ApiNodeFactory.route53HealthCheck = stubs.factoryStub.mockReturnValue({
      id: 'healthCheck',
    });

    const sut = new Route53HealthCheckCollection(<any>stubs.parentStub);
    await sut.create(<any>{ Id: 'testdata' });

    expect(stubs.awsApiStub).toHaveBeenCalledWith({ Id: 'testdata' });

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'healthCheckId');
  });
});
