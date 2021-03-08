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
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
const debug = require('debug')('fluentaws:S3Bucket');
class S3Bucket extends ApiNode_1.ApiNode {
    constructor(parent, name) {
        super(parent);
        this.name = name;
    }
    getObjectCollection(prefix = '') {
        if (this.objectCollectionPrefix != prefix || !this.objectCollection) {
            this.objectCollection = ApiNodeFactory_1.ApiNodeFactory.s3ObjectCollection(this, this.name, prefix);
        }
        return this.objectCollection;
    }
    /**
     * Indicates whether the bucket exists or not.
     */
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                debug('checking exists: %s', this.name);
                yield AwsApi_1.AwsApi.s3(this.config()).headBucket(this.name);
                debug('checked exists: %s = true', this.name);
                return true;
            }
            catch (error) {
                if (error.statusCode === 404) {
                    debug('checked exists: %s = false', this.name);
                    return false;
                }
                throw error;
            }
        });
    }
    /**
     * Attempts to create the S3 bucket if it doesn't exist.
     */
    createIfNotExists() {
        this.promiseChain.add(() => __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.exists();
            if (!exists) {
                debug('create bucket: %s', this.name);
                yield AwsApi_1.AwsApi.s3(this.config()).createBucket(this.name);
                debug('created bucket: %s', this.name);
            }
        }));
        return this;
    }
    objects(prefix) {
        return this.getObjectCollection(prefix);
    }
    object(key) {
        return this.getObjectCollection().getById(key);
    }
}
exports.S3Bucket = S3Bucket;
