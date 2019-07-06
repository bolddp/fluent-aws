import { ECSService } from "aws-sdk/clients/codedeploy";
import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { ApiNode } from '../node/ApiNode';
import { EcsCluster } from "./EcsCluster";
import { EcsService } from "./EcsService";
import { AwsApi } from "../awsapi/AwsApi";

export class EcsServiceCollection extends ApiNodeCollection<EcsService, AWS.ECS.Service> {
  serviceArns?: string[];
  cluster: EcsCluster;

  constructor(parent: ApiNode, cluster: EcsCluster) {
    super(parent);
    this.cluster = cluster;
  }

  apiNodeFromAwsData(awsData: AWS.ECS.Service): EcsService {
    return ApiNodeFactory.ecsService(this, this.cluster, awsData.serviceName, awsData);
  }

  apiNodeFromId(id: string): EcsService {
    return ApiNodeFactory.ecsService(this, this.cluster, id);
  }

  async load(): Promise<AWS.ECS.Service[]> {
    if (!this.serviceArns) {
      this.serviceArns = await AwsApi.ecs.listServices(this.cluster.idOrArn);
    }
    return AwsApi.ecs.describeServices(this.cluster.idOrArn, this.serviceArns);
  }
}