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
exports.IamApi = void 0;
const client_iam_1 = require("@aws-sdk/client-iam");
const debug = require('debug')('fluentaws:IamApi');
class IamApi {
    constructor(config) {
        this.config = config;
        this.iam = () => new client_iam_1.IAM(this.config);
    }
    getRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting role: %s', name);
            const response = yield this.iam().getRole({ RoleName: name });
            debug('got role: %s', name);
            return response.Role;
        });
    }
    getInstanceProfile(name) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting instance profile: %s', name);
            const response = yield this.iam().getInstanceProfile({
                InstanceProfileName: name,
            });
            return response.InstanceProfile;
        });
    }
}
exports.IamApi = IamApi;
