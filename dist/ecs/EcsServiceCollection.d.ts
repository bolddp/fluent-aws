import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { ApiNode } from '../node/ApiNode';
import { EcsService } from './EcsService';
import { Service } from '@aws-sdk/client-ecs';
export declare class EcsServiceCollection extends ApiNodeCollection<EcsService, Service> {
    clusterId: string;
    constructor(parent: ApiNode, clusterId: string);
    apiNodeFromAwsData(awsData: Service): EcsService;
    apiNodeFromId(id: string): EcsService;
    load(): Promise<Service[]>;
}
