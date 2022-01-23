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
exports.KmsApi = void 0;
const AWS = __importStar(require("aws-sdk"));
const debug = require('debug')('fluentaws:KmsApi');
class KmsApi {
    constructor(config) {
        this.kms = () => new AWS.KMS(this.config);
        this.config = config;
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
