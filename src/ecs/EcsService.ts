import { ApiNode } from "../node/ApiNode";
import { AwsApi } from "../awsapi/AwsApi";
import { EcsCluster } from "./EcsCluster";
import { AwsDataApiNode } from "../node/AwsDataApiNode";

const debug = require('debug')('fluentaws:EcsService');

export class EcsService extends AwsDataApiNode<AWS.ECS.Service> {
  clusterId: string;
  name: string;

  constructor(parent: ApiNode, clusterId: string, name: string) {
    super(parent);
    this.clusterId = clusterId;
    this.name = name;
  }

  loadAwsData() {
    return AwsApi.ecs.describeService(this.clusterId, this.name);
  }
}