"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class Ec2InstanceCollection extends ApiNodeCollection_1.ApiNodeCollection {
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.ec2Instance(this, id);
    }
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.ec2Instance(this, data.InstanceId);
    }
    load() {
        return AwsApi_1.AwsApi.ec2(this.config()).describeInstances(this.instanceIds);
    }
}
exports.Ec2InstanceCollection = Ec2InstanceCollection;
