import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { EcsTask } from "./EcsTask";
import { EcsCluster } from "./EcsCluster";
import { ApiNode } from "../node/ApiNode";
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { AwsApi } from "../awsapi/AwsApi";

export class EcsTaskCollection extends ApiNodeCollection<EcsTask, AWS.ECS.Task> {
  clusterId: string;

  constructor(parent: ApiNode, clusterId: string) {
    super(parent);
    this.clusterId = clusterId;
  }

  apiNodeFromAwsData(awsData: AWS.ECS.Task): EcsTask {
    return ApiNodeFactory.ecsTask(this, this.clusterId, awsData.taskArn);
  }

  apiNodeFromId(id: string): EcsTask {
    return ApiNodeFactory.ecsTask(this, this.clusterId, id);
  }

  async load(): Promise<AWS.ECS.Task[]> {
    const taskArns = await AwsApi.ecs(this.config()).listTasks(this.clusterId);
    return AwsApi.ecs(this.config()).describeTasks(this.clusterId, taskArns);
  }
}