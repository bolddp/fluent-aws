"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ecs = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Ecs extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.clusterCollection = ApiNodeFactory_1.ApiNodeFactory.ecsClusterCollection(this);
    }
    clusters() {
        return this.clusterCollection;
    }
    cluster(idOrArn) {
        return this.clusterCollection.getById(idOrArn);
    }
}
exports.Ecs = Ecs;
