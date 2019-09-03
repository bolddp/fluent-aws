import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { EcsCluster } from './EcsCluster';
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { AwsApi } from "../awsapi/AwsApi";

export class EcsClusterCollection extends ApiNodeCollection<EcsCluster, AWS.ECS.Cluster> {
  idOrArns?: string[];

  apiNodeFromId(id: string): EcsCluster {
    return ApiNodeFactory.ecsCluster(this, id);
  }

  apiNodeFromAwsData(data: AWS.ECS.Cluster): EcsCluster {
    return ApiNodeFactory.ecsCluster(this, data.clusterArn);
  }

  async load(): Promise<AWS.ECS.Cluster[]> {
    if (!this.idOrArns) {
      this.idOrArns = await AwsApi.ecs.listClusters();
    }
    return await AwsApi.ecs.describeClusters(this.idOrArns);
  }
}