"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudFormation = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class CloudFormation extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.stackCollection = ApiNodeFactory_1.ApiNodeFactory.cloudFormationStackCollection(this);
    }
    stacks() {
        return this.stackCollection;
    }
    stack(name) {
        return this.stackCollection.getById(name);
    }
}
exports.CloudFormation = CloudFormation;
