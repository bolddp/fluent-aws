import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { Service } from '@aws-sdk/client-ecs';

const debug = require('debug')('fluentaws:EcsService');

export class EcsService extends AwsDataApiNode<Service> {
  clusterId: string;
  name: string;

  constructor(parent: ApiNode, clusterId: string, name: string) {
    super(parent);
    this.clusterId = clusterId;
    this.name = name;
  }

  loadAwsData() {
    return AwsApi.ecs(this.config()).describeService(this.clusterId, this.name);
  }
}
