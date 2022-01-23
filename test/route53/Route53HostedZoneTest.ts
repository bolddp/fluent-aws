import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';

import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { Route53HostedZone } from '../../src/route53/Route53HostedZone';

describe('Route53HostedZone', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53 = () =>
      <any>{
        getHostedZone: stubs.awsApiStub,
      };

    const sut = new Route53HostedZone(<any>stubs.parentStub, 'zoneId');
    await sut.loadAwsData();

    expect(stubs.awsApiStub).toHaveBeenCalledWith('zoneId');
  });

  it('will provide record sets', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53RecordSetCollection = stubs.factoryStub;

    const sut = new Route53HostedZone(<any>stubs.parentStub, 'zoneId');
    sut.recordSets();

    expect(stubs.factoryStub).toHaveBeenCalled();
  });
});
