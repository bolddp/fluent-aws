import { apiNodeCollectionStubs } from '../utils/stubs';
import { Route53HealthCheck } from '../../src/route53/Route53HealthCheck';

import { AwsApi } from '../../src/awsapi/AwsApi';

describe('Route53HealthCheck', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.route53 = () =>
      <any>{
        getHealthCheck: awsApiStub,
      };

    const sut = new Route53HealthCheck(<any>stubs.parentStub, 'id');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('id');
  });

  it('will delete', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new Route53HealthCheck(<any>stubs.parentStub, 'id');

    AwsApi.route53 = () =>
      <any>{
        deleteHealthCheck: stubs.awsApiStub,
      };

    await sut.delete();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('id');
  });
});
