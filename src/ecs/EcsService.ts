import { ApiNode } from "../node/ApiNode";
import { AwsApi } from "../awsapi/AwsApi";
import { EcsCluster } from "./EcsCluster";
import { AwsDataApiNode } from "../node/AwsDataApiNode";

const debug = require('debug')('fluentaws:EcsService');

export class EcsService extends AwsDataApiNode<AWS.ECS.Service> {
  cluster: EcsCluster;
  name: string;

  constructor(parent: ApiNode, cluster: EcsCluster, name: string, awsData: AWS.ECS.Service) {
    super(parent, awsData);
    this.cluster = cluster;
    this.name = name;
  }

  loadAwsData() {
    return AwsApi.ecs.describeService(this.cluster.idOrArn, this.name);
  }

  async resolve(): Promise<EcsService> {
    await this.resolveNode();
    return this;
  }
}