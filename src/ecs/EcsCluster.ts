import { EcsTask } from './EcsTask';
import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { EcsServiceCollection } from './EcsServiceCollection';
import { AwsApi } from '../awsapi/AwsApi';
import { EcsTaskCollection } from './EcsTaskCollection';
import { EcsService } from './EcsService';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { Cluster } from '@aws-sdk/client-ecs';

export class EcsCluster extends AwsDataApiNode<Cluster> {
  idOrArn: string;
  serviceCollection: EcsServiceCollection;
  taskCollection: EcsTaskCollection;

  constructor(parent: ApiNode, idOrArn: string) {
    super(parent);
    this.idOrArn = idOrArn;
    this.serviceCollection = ApiNodeFactory.ecsServiceCollection(
      this,
      this.idOrArn
    );
    this.taskCollection = ApiNodeFactory.ecsTaskCollection(this, this.idOrArn);
  }

  loadAwsData() {
    return AwsApi.ecs(this.config()).describeCluster(this.idOrArn);
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
}
