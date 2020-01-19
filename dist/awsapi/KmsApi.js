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
const AWS = require("aws-sdk");
const debug = require('debug')('fluentaws:KmsApi');
class KmsApi {
    constructor() {
        this.kms = () => new AWS.KMS();
    }
    listAliases() {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`listing aliases`);
            let result = [];
            const recursiveFunction = (marker) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.kms().listAliases({
                    Marker: marker
                }).promise();
                result = result.concat(response.Aliases);
                if (response.Truncated) {
                    yield recursiveFunction(response.NextMarker);
                }
            });
            yield recursiveFunction();
            debug('listed aliases');
            return result;
        });
    }
    listKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`listing keys`);
            let result = [];
            const recursiveFunction = (marker) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.kms().listKeys({
                    Marker: marker
                }).promise();
                result = result.concat(response.Keys);
                if (response.Truncated) {
                    yield recursiveFunction(response.NextMarker);
                }
            });
            yield recursiveFunction();
            debug('listed keys');
            return result;
        });
    }
    describeKey(keyId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`describing key: %s`, keyId);
            const response = yield this.kms().describeKey({
                KeyId: keyId
            }).promise();
            debug('described key');
            return response.KeyMetadata;
        });
    }
}
exports.KmsApi = KmsApi;
