"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3 = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class S3 extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.bucketCollection = ApiNodeFactory_1.ApiNodeFactory.s3BucketCollection(this);
    }
    buckets() {
        return this.bucketCollection;
    }
    bucket(name) {
        return this.bucketCollection.getById(name);
    }
}
exports.S3 = S3;
