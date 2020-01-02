import { ApiNode } from '../node/ApiNode';
import { CloudFormationStackCollection } from './CloudFormationStackCollection';
export declare class CloudFormation extends ApiNode {
    stackCollection: CloudFormationStackCollection;
    constructor(parent: ApiNode);
    stacks(): CloudFormationStackCollection;
    stack(name: string): import("./CloudFormationStack").CloudFormationStack;
}
