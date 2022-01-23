import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { Route53RecordSetCollection } from '../../src/route53/Route53RecordSetCollection';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('Route53RecordSetCollection', () => {
  it('will load AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53 = () =>
      <any>{
        listRecordSets: stubs.awsApiStub,
      };

    const sut = new Route53RecordSetCollection(
      <any>stubs.parentStub,
      'hostedZoneId'
    );
    await sut.loadAwsData();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });

  it('will create record set', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53 = () =>
      <any>{
        createRecordSet: stubs.awsApiStub,
      };

    const sut = new Route53RecordSetCollection(
      <any>stubs.parentStub,
      'hostedZoneId'
    );
    await sut.create(<any>{ Name: 'dnsName' });

    expect(stubs.awsApiStub).toHaveBeenCalledWith('hostedZoneId', {
      Name: 'dnsName',
    });
  });

  it('will delete record set', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.route53 = () =>
      <any>{
        deleteRecordSet: stubs.awsApiStub,
      };

    const sut = new Route53RecordSetCollection(
      <any>stubs.parentStub,
      'hostedZoneId'
    );
    await sut.delete(<any>{ Name: 'dnsName' });

    expect(stubs.awsApiStub).toHaveBeenCalledWith('hostedZoneId', {
      Name: 'dnsName',
    });
  });
});
