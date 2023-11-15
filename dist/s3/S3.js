"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3 = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
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
    client() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.s3(this.config()).getClient();
        });
    }
}
exports.S3 = S3;
