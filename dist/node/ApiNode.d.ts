import { FluentAwsConfig } from "../FluentAwsConfig";
import { PromiseChain } from "./PromiseChain";
/**
 * A node in the fluent API hierarchy. The responsibility of a node in the
 * hierarchy, e.g. an Ec2 or EcsTask instance, is to resolve its parent
 * before it resolves itself to make sure that all pending promises are executed.
 */
export declare class ApiNode {
    isResolving: boolean;
    promiseChain: PromiseChain;
    parent: ApiNode;
    constructor(parent: ApiNode);
    config(): FluentAwsConfig;
    /**
     * Ensures that the API node is resolved, which means that the promise chains of itself and
     * all its parents are executed to make sure any deferred actions are carried out before
     * trying to operate on this object.
     *
     * One example is when accessing the EC2 instance of a specific ECS task
     * { @code task('taskArn').ec2Instance().awsData() }. Before being able to operate on the EC2
     * instance, like reading its awsData(), the task must be queried to get the EC2 instance id.
     * This query is added to the promise chain of the ECS task when the ec2Instance() method is
     * called, but not carried out until an actual operation on the EC2 instance is performed.
     *
     * Any AWS SDK operation on an API node needs to start by calling ensureResolved() to make
     * sure that all pending operations have been carried out.
     */
    ensureResolved(): Promise<void>;
}
