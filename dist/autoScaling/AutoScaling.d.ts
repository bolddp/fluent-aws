import { ApiNode } from "../node/ApiNode";
import { AutoScalingGroup } from "./AutoScalingGroup";
import { AutoScalingGroupCollection } from "./AutoScalingGroupCollection";
/**
 * Base node for the Autoscaling group API, providing access to underlying
 * collections.
 */
export declare class AutoScaling extends ApiNode {
    asgCollection: AutoScalingGroupCollection;
    constructor(parent: ApiNode);
    groups(): AutoScalingGroupCollection;
    group(name: string): AutoScalingGroup;
}
