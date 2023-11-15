import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { EcsCluster } from './EcsCluster';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { Cluster } from '@aws-sdk/client-ecs';

export class EcsClusterCollection extends ApiNodeCollection<
  EcsCluster,
  Cluster
> {
  apiNodeFromId(id: string): EcsCluster {
    return ApiNodeFactory.ecsCluster(this, id);
  }

  apiNodeFromAwsData(data: Cluster): EcsCluster {
    return ApiNodeFactory.ecsCluster(this, data.clusterArn);
  }

  async load(): Promise<Cluster[]> {
    const clusterArns = await AwsApi.ecs(this.config()).listClusters();
    return await AwsApi.ecs(this.config()).describeClusters(clusterArns);
  }
}
