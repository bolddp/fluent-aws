import { Route53RecordSetCollection } from './Route53RecordSetCollection';
import { ApiNodeFactory } from './../node/ApiNodeFactory';
import { ApiNode } from './../node/ApiNode';
import { AwsApi } from './../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';

export class Route53HostedZone extends AwsDataApiNode<AWS.Route53.HostedZone> {
  id: string;
  recordSetCollection: Route53RecordSetCollection;

  constructor(parent: ApiNode, id: string) {
    super(parent);
    this.id = id;
    this.recordSetCollection = ApiNodeFactory.route53RecordSetCollection(this, this.id);
  }

  loadAwsData() {
    return AwsApi.route53(this.config()).getHostedZone(this.id);
  }

  recordSets(): Route53RecordSetCollection {
    return this.recordSetCollection;
  }
}