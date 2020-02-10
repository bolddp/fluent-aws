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
const AwsApi_1 = require("../awsapi/AwsApi");
const ApiNode_1 = require("../node/ApiNode");
class CognitoUser extends ApiNode_1.ApiNode {
    constructor(parent, userName, poolId) {
        super(parent);
        this.userName = userName;
        this.poolId = poolId;
    }
    login(password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.cognito.login(this.poolId.poolId, this.poolId.clientId, this.userName, password);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito.refresh(this.poolId.poolId, this.poolId.clientId, this.userName, refreshToken);
        });
    }
    addToGroup(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito.addUserToGroup(this.poolId.poolId, this.userName, groupName);
        });
    }
    removeFromGroup(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito.removeUserFromGroup(this.poolId.poolId, this.userName, groupName);
        });
    }
    globalSignOut() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito.globalSignOut(this.poolId.poolId, this.userName);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.cognito.deleteUser(this.poolId.poolId, this.userName);
        });
    }
}
exports.CognitoUser = CognitoUser;
