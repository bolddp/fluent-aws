"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route53HostedZoneCollection = void 0;
const AwsApi_1 = require("./../awsapi/AwsApi");
const ApiNodeFactory_1 = require("./../node/ApiNodeFactory");
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
class Route53HostedZoneCollection extends ApiNodeCollection_1.ApiNodeCollection {
    apiNodeFromAwsData(awsData) {
        return ApiNodeFactory_1.ApiNodeFactory.route53HostedZone(this, awsData.Id);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.route53HostedZone(this, id);
    }
    load() {
        return AwsApi_1.AwsApi.route53(this.config()).listHostedZones();
    }
}
exports.Route53HostedZoneCollection = Route53HostedZoneCollection;
