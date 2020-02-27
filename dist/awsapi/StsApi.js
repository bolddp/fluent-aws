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
class StsApi {
    constructor() {
        this.sts = () => new AWS.STS();
    }
    assumeRole(roleArn, sessionName) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                DurationSeconds: 3600,
                ExternalId: sessionName,
                RoleArn: roleArn,
                RoleSessionName: sessionName
            };
            const assumed = yield this.sts().assumeRole(params).promise();
            AWS.config.update({
                accessKeyId: assumed.Credentials.AccessKeyId,
                secretAccessKey: assumed.Credentials.SecretAccessKey,
                sessionToken: assumed.Credentials.SessionToken
            });
        });
    }
}
exports.StsApi = StsApi;
