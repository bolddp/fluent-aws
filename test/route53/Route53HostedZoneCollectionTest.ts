import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Route53HostedZoneCollection } from '../../src/route53/Route53HostedZoneCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('Route53HostedZoneCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HostedZone = stubs.factoryStub;

    const sut = new Route53HostedZoneCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('hostedZoneId');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'hostedZoneId');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.route53HostedZone = stubs.factoryStub;
    const awsData: AWS.Route53.HostedZone = <any>{
      Id: 'hostedZoneId',
    };

    const sut = new Route53HostedZoneCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'hostedZoneId');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53 = () =>
      <any>{
        listHostedZones: stubs.awsApiStub,
      };
    const sut = new Route53HostedZoneCollection(<any>stubs.parentStub);

    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });
});
