"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsQueueCollection = void 0;
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const AwsApi_1 = require("../awsapi/AwsApi");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class SqsQueueCollection extends ApiNodeCollection_1.ApiNodeCollection {
    load() {
        return AwsApi_1.AwsApi.sqs(this.config()).listQueueUrls();
    }
    apiNodeFromAwsData(url) {
        return ApiNodeFactory_1.ApiNodeFactory.sqsQueue(this, url);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.sqsQueue(this, id);
    }
}
exports.SqsQueueCollection = SqsQueueCollection;
