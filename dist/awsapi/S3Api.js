"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const AWS = __importStar(require("aws-sdk"));
class S3Api {
    constructor(config) {
        this.s3 = () => new AWS.S3({
            region: this.config.region,
            credentials: this.config.credentials
        });
        this.config = config;
    }
    headBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().headBucket({ Bucket: bucketName }).promise();
        });
    }
    createBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().createBucket({ Bucket: bucketName }).promise();
        });
    }
    listObjects(bucketName, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.s3().listObjects({
                Bucket: bucketName,
                Prefix: prefix
            }).promise();
            return response.Contents;
        });
    }
    listBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.s3().listBuckets().promise();
            return response.Buckets;
        });
    }
    headObject(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().headObject({
                Bucket: bucketName,
                Key: key
            }).promise();
        });
    }
    getObject(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.s3().getObject({
                Bucket: bucketName,
                Key: key
            }).promise();
            return response;
        });
    }
    getObjectStream(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.s3().getObject({
                Bucket: bucketName,
                Key: key
            }).createReadStream();
        });
    }
    deleteObject(bucketName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().deleteObject({
                Bucket: bucketName,
                Key: key
            }).promise();
        });
    }
    upload(bucketName, key, body, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().upload({
                Bucket: bucketName,
                Key: key,
                Body: body,
                ContentType: contentType
            }).promise();
        });
    }
    putObject(bucketName, key, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().putObject({
                Bucket: bucketName,
                Key: key,
                Body: body
            }).promise();
        });
    }
    copyObject(sourceBucket, sourceKey, targetBucket, targetKey, acl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3().copyObject({
                CopySource: `/${sourceBucket}/${sourceKey}`,
                Bucket: targetBucket,
                Key: targetKey,
                ACL: acl
            }).promise();
        });
    }
    getSignedUrl(operation, bucket, key) {
        const url = this.s3().getSignedUrl(operation, {
            Bucket: bucket,
            Key: key
        });
        return Promise.resolve(url);
    }
}
exports.S3Api = S3Api;
