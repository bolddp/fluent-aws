"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const AwsApi_1 = require("../awsapi/AwsApi");
class IamRole extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, name) {
        super(parent);
        this.name = name;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.iam.getRole(this.name);
    }
}
exports.IamRole = IamRole;
