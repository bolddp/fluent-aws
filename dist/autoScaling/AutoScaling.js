"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoScaling = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
/**
 * Base node for the Autoscaling group API, providing access to underlying
 * collections.
 */
class AutoScaling extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.asgCollection = ApiNodeFactory_1.ApiNodeFactory.autoScalingGroupCollection(this);
    }
    groups() {
        return this.asgCollection;
    }
    group(name) {
        return this.asgCollection.getById(name);
    }
}
exports.AutoScaling = AutoScaling;
