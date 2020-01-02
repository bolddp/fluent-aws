import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { ApiNode } from '../node/ApiNode';
import { EcsService } from "./EcsService";
export declare class EcsServiceCollection extends ApiNodeCollection<EcsService, AWS.ECS.Service> {
    clusterId: string;
    constructor(parent: ApiNode, clusterId: string);
    apiNodeFromAwsData(awsData: AWS.ECS.Service): EcsService;
    apiNodeFromId(id: string): EcsService;
    load(): Promise<AWS.ECS.Service[]>;
}
