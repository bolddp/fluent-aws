import { AwsApi } from './../awsapi/AwsApi';
import { ApiNodeFactory } from './../node/ApiNodeFactory';
import { Route53HostedZone } from './Route53HostedZone';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { HostedZone } from '@aws-sdk/client-route-53';

export class Route53HostedZoneCollection extends ApiNodeCollection<
  Route53HostedZone,
  HostedZone
> {
  apiNodeFromAwsData(awsData: HostedZone): Route53HostedZone {
    return ApiNodeFactory.route53HostedZone(this, awsData.Id);
  }

  apiNodeFromId(id: string): Route53HostedZone {
    return ApiNodeFactory.route53HostedZone(this, id);
  }

  load(): Promise<HostedZone[]> {
    return AwsApi.route53(this.config()).listHostedZones();
  }
}
