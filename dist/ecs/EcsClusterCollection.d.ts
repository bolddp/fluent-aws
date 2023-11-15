import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { EcsCluster } from './EcsCluster';
import { Cluster } from '@aws-sdk/client-ecs';
export declare class EcsClusterCollection extends ApiNodeCollection<EcsCluster, Cluster> {
    apiNodeFromId(id: string): EcsCluster;
    apiNodeFromAwsData(data: Cluster): EcsCluster;
    load(): Promise<Cluster[]>;
}
