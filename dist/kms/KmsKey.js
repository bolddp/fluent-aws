"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KmsKey = void 0;
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const AwsApi_1 = require("../awsapi/AwsApi");
class KmsKey extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, id) {
        super(parent);
        this.id = id;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.kms(this.config()).describeKey(this.id);
    }
}
exports.KmsKey = KmsKey;
