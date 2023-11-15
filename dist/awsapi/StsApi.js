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
exports.StsApi = void 0;
const client_sts_1 = require("@aws-sdk/client-sts");
class StsApi {
    constructor(config) {
        this.config = config;
        this.sts = () => new client_sts_1.STS(this.config);
    }
    assumeRole(roleArn, sessionName, durationSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                DurationSeconds: durationSeconds,
                ExternalId: sessionName,
                RoleArn: roleArn,
                RoleSessionName: sessionName,
            };
            const assumed = yield this.sts().assumeRole(params);
            return {
                accessKeyId: assumed.Credentials.AccessKeyId,
                secretAccessKey: assumed.Credentials.SecretAccessKey,
                sessionToken: assumed.Credentials.SessionToken,
            };
        });
    }
}
exports.StsApi = StsApi;
