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
exports.S3ObjectCollection = void 0;
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class S3ObjectCollection extends ApiNodeCollection_1.ApiNodeCollection {
    constructor(parent, bucketName, prefix) {
        super(parent);
        this.bucketName = bucketName;
        this.prefix = prefix;
    }
    apiNodeFromAwsData(awsData) {
        return ApiNodeFactory_1.ApiNodeFactory.s3Object(this, this.bucketName, awsData.Key);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.s3Object(this, this.bucketName, id);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return AwsApi_1.AwsApi.s3(this.config()).listObjects(this.bucketName, this.prefix);
        });
    }
}
exports.S3ObjectCollection = S3ObjectCollection;
