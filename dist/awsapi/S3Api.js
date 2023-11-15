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
exports.S3Api = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class S3Api {
    constructor(config) {
        this.config = config;
        this.s3 = () => new client_s3_1.S3({
            region: this.config.region,
            credentials: this.config.credentials,
        });
    }
    getClient() {
        return this.s3();
    }
    headBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().headBucket({ Bucket: bucketName });
        });
    }
    createBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().createBucket({ Bucket: bucketName });
        });
    }
    listObjects(bucketName, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.s3().listObjects({
                Bucket: bucketName,
                Prefix: prefix,
            });
            return response.Contents;
        });
    }
    listBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.s3().listBuckets({});
            return response.Buckets;
        });
    }
    headObject(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().headObject({
                Bucket: bucketName,
                Key: key,
            });
        });
    }
    getObject(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.s3().getObject({
                Bucket: bucketName,
                Key: key,
            });
            return response;
        });
    }
    getObjectStream(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.s3().getObject({
                Bucket: bucketName,
                Key: key,
            });
            return response.Body.transformToWebStream();
        });
    }
    deleteObject(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().deleteObject({
                Bucket: bucketName,
                Key: key,
            });
        });
    }
    upload(bucketName, key, body, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().putObject({
                Bucket: bucketName,
                Key: key,
                Body: body,
                ContentType: contentType,
            });
        });
    }
    putObject(bucketName, key, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().putObject({
                Bucket: bucketName,
                Key: key,
                Body: body,
            });
        });
    }
    copyObject(sourceBucket, sourceKey, targetBucket, targetKey, acl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().copyObject({
                CopySource: `/${sourceBucket}/${sourceKey}`,
                Bucket: targetBucket,
                Key: targetKey,
                ACL: acl,
            });
        });
    }
    getSignedUrl(operation, bucket, key) {
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const command = operation === 'putObject'
            ? new client_s3_1.PutObjectCommand(params)
            : new client_s3_1.GetObjectCommand(params);
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3(), command);
    }
}
exports.S3Api = S3Api;
