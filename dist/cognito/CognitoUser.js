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
exports.CognitoUser = void 0;
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
class CognitoUser extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, userName, poolId) {
        super(parent);
        this.userName = userName;
        this.poolId = poolId;
    }
    loadAwsData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AwsApi_1.AwsApi.cognito(this.config()).getUser(this.poolId.poolId, this.userName);
        });
    }
    login(password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito(this.config()).login(this.poolId.poolId, this.poolId.clientId, this.userName, password);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito(this.config()).refresh(this.poolId.poolId, this.poolId.clientId, this.userName, refreshToken);
        });
    }
    addToGroup(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito(this.config()).addUserToGroup(this.poolId.poolId, this.userName, groupName);
        });
    }
    removeFromGroup(groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito(this.config()).removeUserFromGroup(this.poolId.poolId, this.userName, groupName);
        });
    }
    /**
     * Returns a string array containing the groups that this user belongs to.
     */
    listGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito(this.config()).listGroupsForUser(this.poolId.poolId, this.userName);
        });
    }
    globalSignOut() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cognito(this.config()).globalSignOut(this.poolId.poolId, this.userName);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.cognito(this.config()).deleteUser(this.poolId.poolId, this.userName);
        });
    }
    updateAttributes(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.cognito(this.config()).updateUserAttributes(this.poolId.poolId, this.userName, Object.entries(attributes).map(([key, value]) => ({
                Name: key,
                Value: value,
            })));
        });
    }
}
exports.CognitoUser = CognitoUser;
