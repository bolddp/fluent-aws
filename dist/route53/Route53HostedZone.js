"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNodeFactory_1 = require("./../node/ApiNodeFactory");
const AwsApi_1 = require("./../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
class Route53HostedZone extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, id) {
        super(parent);
        this.id = id;
        this.recordSetCollection = ApiNodeFactory_1.ApiNodeFactory.route53RecordSetCollection(this, this.id);
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.route53(this.config()).getHostedZone(this.id);
    }
    recordSets() {
        return this.recordSetCollection;
    }
}
exports.Route53HostedZone = Route53HostedZone;
