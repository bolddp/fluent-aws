"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cognito = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Cognito extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.userPoolCollection = ApiNodeFactory_1.ApiNodeFactory.cognitoUserPoolCollection(this);
    }
    userPool(poolId) {
        return this.userPoolCollection.getById(`${poolId.poolId}/${poolId.clientId}`);
    }
}
exports.Cognito = Cognito;
