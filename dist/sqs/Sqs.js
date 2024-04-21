"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqs = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Sqs extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.queueCollection = ApiNodeFactory_1.ApiNodeFactory.sqsQueueCollection(this);
    }
    queues() {
        return this.queueCollection;
    }
    queue(url) {
        return this.queueCollection.getById(url);
    }
}
exports.Sqs = Sqs;
