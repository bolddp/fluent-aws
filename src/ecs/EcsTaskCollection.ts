import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { EcsTask } from "./EcsTask";
import { EcsCluster } from "./EcsCluster";
import { ApiNode } from "../node/ApiNode";
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { AwsApi } from "../awsapi/AwsApi";

export class EcsTaskCollection extends ApiNodeCollection<EcsTask, AWS.ECS.Task> {
  cluster: EcsCluster;

  constructor(parent: ApiNode, cluster: EcsCluster) {
    super(parent);
    this.cluster = cluster;
  }

  apiNodeFromAwsData(awsData: AWS.ECS.Task): EcsTask {
    return ApiNodeFactory.ecsTask(this, this.cluster, awsData.clusterArn, awsData);
  }

  apiNodeFromId(id: string): EcsTask {
    return ApiNodeFactory.ecsTask(this, this.cluster, id);
  }

  async load(): Promise<AWS.ECS.Task[]> {
    const taskArns = await AwsApi.ecs.listTasks(this.cluster.idOrArn);
    return AwsApi.ecs.describeTasks(this.cluster.idOrArn, taskArns);
  }

}