"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcsService = void 0;
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const debug = require('debug')('fluentaws:EcsService');
class EcsService extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, clusterId, name) {
        super(parent);
        this.clusterId = clusterId;
        this.name = name;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.ecs(this.config()).describeService(this.clusterId, this.name);
    }
}
exports.EcsService = EcsService;
