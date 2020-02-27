"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class S3BucketCollection extends ApiNodeCollection_1.ApiNodeCollection {
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.s3Bucket(this, data.Name);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.s3Bucket(this, id);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AwsApi_1.AwsApi.s3.listBuckets();
        });
    }
}
exports.S3BucketCollection = S3BucketCollection;
