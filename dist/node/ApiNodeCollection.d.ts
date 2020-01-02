import { ApiNode } from "./ApiNode";
/**
 * Base class for nodes that represents a collection in the API, e.g.
 * all the EC2 instances in the account or all services in an ECS cluster.
 */
export declare abstract class ApiNodeCollection<T, TAwsData> extends ApiNode {
    nodeMap: Map<string, T>;
    constructor(parent: ApiNode);
    protected abstract load(): Promise<TAwsData[]>;
    protected abstract apiNodeFromAwsData(data: TAwsData): T;
    protected abstract apiNodeFromId(id: string): T;
    /**
     * Looks for an API Node by its id, e.g. the InstanceId of an EC2 instance.
     * If none is found, an instance is created and added to the map.
     */
    getById(id: string): T;
    find(predicate: (o: TAwsData) => boolean): Promise<T[]>;
    /**
     * Retrieves the AWS SDK data for this collection.
     */
    awsData(): Promise<TAwsData[]>;
}
