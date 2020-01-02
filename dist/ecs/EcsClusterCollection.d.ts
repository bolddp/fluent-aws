import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { EcsCluster } from './EcsCluster';
export declare class EcsClusterCollection extends ApiNodeCollection<EcsCluster, AWS.ECS.Cluster> {
    apiNodeFromId(id: string): EcsCluster;
    apiNodeFromAwsData(data: AWS.ECS.Cluster): EcsCluster;
    load(): Promise<AWS.ECS.Cluster[]>;
}
