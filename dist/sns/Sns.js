"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sns = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Sns extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.topicCollection = ApiNodeFactory_1.ApiNodeFactory.snsTopicCollection(this);
    }
    topics() {
        return this.topicCollection;
    }
    topic(arn) {
        return this.topicCollection.getById(arn);
    }
}
exports.Sns = Sns;
