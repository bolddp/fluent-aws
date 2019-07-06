import { EcsTask } from "./EcsTask";
import { ApiNode } from "../node/ApiNode";
import { ApiNodeFactory } from "../node/ApiNodeFactory";
import { EcsServiceCollection } from "./EcsServiceCollection";
import { AwsApi } from "../awsapi/AwsApi";
import { EcsTaskCollection } from "./EcsTaskCollection";
import { EcsService } from "./EcsService";
import { AwsDataApiNode } from "../node/AwsDataApiNode";

export class EcsCluster extends AwsDataApiNode<AWS.ECS.Cluster> {
  idOrArn: string;
  serviceCollection: EcsServiceCollection;
  taskCollection: EcsTaskCollection;

  constructor(parent: ApiNode, idOrArn: string, awsData?: AWS.ECS.Cluster) {
    super(parent, awsData);
    this.idOrArn = idOrArn;
    this.serviceCollection = ApiNodeFactory.ecsServiceCollection(this, this);
    this.taskCollection = ApiNodeFactory.ecsTaskCollection(this, this);
  }

  loadAwsData() {
    return AwsApi.ecs.describeCluster(this.idOrArn);
  }

  task(id: string): EcsTask {
    return this.taskCollection.getById(id);
  }

  tasks(): EcsTaskCollection {
    return this.taskCollection;
  }

  service(id: string): EcsService {
    return this.serviceCollection.getById(id);
  }

  services(): EcsServiceCollection {
    return this.serviceCollection;
  }

  async resolve(): Promise<EcsCluster> {
    await this.resolveNode();
    return this;
  }
}