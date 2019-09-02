import { EcsCluster } from './EcsCluster';
import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { EcsClusterCollection } from './EcsClusterCollection';

export class Ecs extends ApiNode {
  clusterCollection: EcsClusterCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.clusterCollection = ApiNodeFactory.ecsClusterCollection(this);
  }

  clusters(): EcsClusterCollection {
    return this.clusterCollection;
  }

  cluster(idOrArn: string): EcsCluster {
    return this.clusterCollection.getById(idOrArn);
  }
}