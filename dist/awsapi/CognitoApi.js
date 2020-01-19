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
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const debug = require('debug')('fluentaws:CognitoApi');
class CognitoApi {
    constructor() {
        this.cognitoSp = () => new AWS.CognitoIdentityServiceProvider();
    }
    getPoolData(poolId, clientId) {
        const poolData = {
            UserPoolId: poolId,
            ClientId: clientId
        };
        return new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
    }
    getUser(poolId, clientId, userName) {
        const pool = this.getPoolData(poolId, clientId);
        const userData = {
            Username: userName,
            Pool: pool
        };
        return new amazon_cognito_identity_js_1.CognitoUser(userData);
    }
    listUserPools() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing user pools');
            const response = yield this.cognitoSp().listUserPools().promise();
            debug('listed user pools');
            return response.UserPools;
        });
    }
    describeUserPool(poolId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing user pool: %s', poolId);
            const response = yield this.cognitoSp().describeUserPool().promise();
            debug('described user pool');
            return response.UserPool;
        });
    }
    signup(poolId, clientId, userName, password, attributeList) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('signing up: %s, clientId: %s, userName: %s, attr: %j', poolId, clientId, userName, attributeList);
            const poolData = this.getPoolData(poolId, clientId);
            return new Promise((resolve, reject) => {
                poolData.signUp(userName, password, attributeList, null, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        debug('signed up');
                        resolve(result);
                    }
                });
            });
        });
    }
    login(poolId, clientId, userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticationData = {
                Username: userName,
                Password: password
            };
            const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails(authenticationData);
            const user = this.getUser(poolId, clientId, userName);
            return yield new Promise((resolve, reject) => {
                user.authenticateUser(authenticationDetails, {
                    onSuccess: (session) => resolve(session),
                    onFailure: (err) => reject(err)
                });
            });
        });
    }
    refresh(poolId, clientId, userName, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getUser(poolId, clientId, userName);
            return yield new Promise((resolve, reject) => {
                user.refreshSession(new amazon_cognito_identity_js_1.CognitoRefreshToken({ RefreshToken: refreshToken }), (err, session) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(session);
                    }
                });
            });
        });
    }
}
exports.CognitoApi = CognitoApi;
