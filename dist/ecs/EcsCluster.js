"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
class EcsCluster extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, idOrArn) {
        super(parent);
        this.idOrArn = idOrArn;
        this.serviceCollection = ApiNodeFactory_1.ApiNodeFactory.ecsServiceCollection(this, this.idOrArn);
        this.taskCollection = ApiNodeFactory_1.ApiNodeFactory.ecsTaskCollection(this, this.idOrArn);
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.ecs(this.config()).describeCluster(this.idOrArn);
    }
    task(id) {
        return this.taskCollection.getById(id);
    }
    tasks() {
        return this.taskCollection;
    }
    service(id) {
        return this.serviceCollection.getById(id);
    }
    services() {
        return this.serviceCollection;
    }
}
exports.EcsCluster = EcsCluster;
