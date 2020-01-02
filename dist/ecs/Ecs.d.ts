import { EcsCluster } from './EcsCluster';
import { ApiNode } from '../node/ApiNode';
import { EcsClusterCollection } from './EcsClusterCollection';
export declare class Ecs extends ApiNode {
    clusterCollection: EcsClusterCollection;
    constructor(parent: ApiNode);
    clusters(): EcsClusterCollection;
    cluster(idOrArn: string): EcsCluster;
}
