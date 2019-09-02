import { ApiNode } from "../node/ApiNode";
import { AutoScalingGroup } from "./AutoScalingGroup";
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AutoScalingGroupCollection } from "./AutoScalingGroupCollection";

/**
 * Base node for the Autoscaling group API, providing access to underlying
 * collections.
 */
export class AutoScaling extends ApiNode {
  asgCollection: AutoScalingGroupCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.asgCollection = ApiNodeFactory.autoScalingGroupCollection(this);
  }

  groups(): AutoScalingGroupCollection {
    return this.asgCollection;
  }

  group(name: string): AutoScalingGroup {
    return this.asgCollection.getById(name);
  }
}