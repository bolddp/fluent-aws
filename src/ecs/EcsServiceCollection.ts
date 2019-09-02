import { ECSService } from "aws-sdk/clients/codedeploy";
import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { ApiNode } from '../node/ApiNode';
import { EcsCluster } from "./EcsCluster";
import { EcsService } from "./EcsService";
import { AwsApi } from "../awsapi/AwsApi";

export class EcsServiceCollection extends ApiNodeCollection<EcsService, AWS.ECS.Service> {
  clusterId: string;
  serviceArns?: string[];

  constructor(parent: ApiNode, clusterId: string) {
    super(parent);
    this.clusterId = clusterId;
  }

  apiNodeFromAwsData(awsData: AWS.ECS.Service): EcsService {
    return ApiNodeFactory.ecsService(this, this.clusterId, awsData.serviceName, awsData);
  }

  apiNodeFromId(id: string): EcsService {
    return ApiNodeFactory.ecsService(this, this.clusterId, id);
  }

  async load(): Promise<AWS.ECS.Service[]> {
    if (!this.serviceArns) {
      this.serviceArns = await AwsApi.ecs.listServices(this.clusterId);
    }
    return AwsApi.ecs.describeServices(this.clusterId, this.serviceArns);
  }
}