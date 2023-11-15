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
exports.KmsApi = void 0;
const client_kms_1 = require("@aws-sdk/client-kms");
const debug = require('debug')('fluentaws:KmsApi');
class KmsApi {
    constructor(config) {
        this.config = config;
        this.kms = () => new client_kms_1.KMS(this.config);
    }
    listAliases() {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`listing aliases`);
            let result = [];
            const recursiveFunction = (marker) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.kms().listAliases({
                    Marker: marker,
                });
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
                    Marker: marker,
                });
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
                KeyId: keyId,
            });
            debug('described key');
            return response.KeyMetadata;
        });
    }
}
exports.KmsApi = KmsApi;
