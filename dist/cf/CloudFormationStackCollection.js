"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class CloudFormationStackCollection extends ApiNodeCollection_1.ApiNodeCollection {
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.cloudFormationStack(this, data.StackName);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.cloudFormationStack(this, id);
    }
    load() {
        return AwsApi_1.AwsApi.cloudFormation(this.config()).describeStacks();
    }
}
exports.CloudFormationStackCollection = CloudFormationStackCollection;
