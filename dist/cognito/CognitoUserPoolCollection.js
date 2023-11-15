"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoUserPoolCollection = void 0;
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class CognitoUserPoolCollection extends ApiNodeCollection_1.ApiNodeCollection {
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.cognitoUserPool(this, {
            poolId: data.Id,
        });
    }
    apiNodeFromId(id) {
        // Id is of format poolId/clientId, and clientId may not be present
        const segments = id.split('/');
        const poolId = segments[0];
        const clientId = segments[1];
        return ApiNodeFactory_1.ApiNodeFactory.cognitoUserPool(this, { poolId, clientId });
    }
    load() {
        return AwsApi_1.AwsApi.cognito(this.config()).listUserPools();
    }
}
exports.CognitoUserPoolCollection = CognitoUserPoolCollection;
