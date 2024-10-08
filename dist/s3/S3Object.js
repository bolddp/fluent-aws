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
exports.S3Object = void 0;
const stream_1 = require("stream");
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const debug = require('debug')('fluentaws:S3Object');
class S3Object extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, bucketName, key) {
        super(parent);
        this.bucketName = bucketName;
        this.key = key;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.s3(this.config()).getObject(this.bucketName, this.key);
    }
    /**
     * Indicates whether the bucket exists or not.
     */
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                debug('checking object exists... bucket: %s, key: %s', this.bucketName, this.key);
                yield AwsApi_1.AwsApi.s3(this.config()).headObject(this.bucketName, this.key);
                debug('checked object exists = true... bucket: %s, key: %s', this.bucketName, this.key);
                return true;
            }
            catch (error) {
                if (error.name === 'NotFound') {
                    debug('checked object exists = false... bucket: %s, key: %s', this.bucketName, this.key);
                    return false;
                }
                throw error;
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.s3(this.config()).deleteObject(this.bucketName, this.key);
        });
    }
    writeS3Object(s3Object, acl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.s3(this.config()).copyObject(s3Object.bucketName, s3Object.key, this.bucketName, this.key, acl);
            return s3Object;
        });
    }
    writeString(contents) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.s3(this.config()).putObject(this.bucketName, this.key, stream_1.Readable.from(contents));
        });
    }
    readString() {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = yield this.awsData();
            return obj.Body.toString();
        });
    }
    readStream() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.s3(this.config()).getObjectStream(this.bucketName, this.key);
        });
    }
}
exports.S3Object = S3Object;
