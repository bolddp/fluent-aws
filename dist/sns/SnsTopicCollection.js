"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const AwsApi_1 = require("../awsapi/AwsApi");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class SnsTopicCollection extends ApiNodeCollection_1.ApiNodeCollection {
    load() {
        return AwsApi_1.AwsApi.sns(this.config()).listTopics();
    }
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.snsTopic(this, data.TopicArn);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.snsTopic(this, id);
    }
}
exports.SnsTopicCollection = SnsTopicCollection;
