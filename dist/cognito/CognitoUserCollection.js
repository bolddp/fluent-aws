"use strict";
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
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.cognitoUser(this, data.Username, this.poolId);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.cognitoUser(this, id, this.poolId);
    }
}
exports.CognitoUserCollection = CognitoUserCollection;
