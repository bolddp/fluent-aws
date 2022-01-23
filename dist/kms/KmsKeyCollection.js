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
exports.KmsKeyCollection = void 0;
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class KmsKeyCollection extends ApiNodeCollection_1.ApiNodeCollection {
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const allKeys = yield AwsApi_1.AwsApi.kms(this.config()).listKeys();
            let result = [];
            for (const key of allKeys) {
                const metaData = yield AwsApi_1.AwsApi.kms(this.config()).describeKey(key.KeyId);
                result.push(metaData);
            }
            return result;
        });
    }
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.kmsKey(this, data.KeyId);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.kmsKey(this, id);
    }
}
exports.KmsKeyCollection = KmsKeyCollection;
