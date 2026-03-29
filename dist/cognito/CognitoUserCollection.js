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
exports.CognitoUserCollection = void 0;
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const AwsApi_1 = require("../awsapi/AwsApi");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class CognitoUserCollection extends ApiNodeCollection_1.ApiNodeCollection {
    constructor(parent, poolId) {
        super(parent);
        this.poolId = poolId;
    }
    load() {
        return AwsApi_1.AwsApi.cognito(this.config()).listUsers(this.poolId.poolId);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield AwsApi_1.AwsApi.cognito(this.config()).listUsersByEmail(this.poolId.poolId, email);
            return users.map((u) => this.apiNodeFromAwsData(u));
        });
    }
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.cognitoUser(this, data.Username, this.poolId);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.cognitoUser(this, id, this.poolId);
    }
}
exports.CognitoUserCollection = CognitoUserCollection;
