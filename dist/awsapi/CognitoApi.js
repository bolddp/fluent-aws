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
    constructor(config) {
        this.cognitoSp = () => new AWS.CognitoIdentityServiceProvider(this.config);
        this.config = config;
    }
    getPoolData(poolId, clientId) {
        const poolData = {
            UserPoolId: poolId,
            ClientId: clientId
        };
        return new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
    }
    getCognitoUser(poolId, clientId, userName) {
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
            const response = yield this.cognitoSp().describeUserPool({
                UserPoolId: poolId
            }).promise();
            debug('described user pool');
            return response.UserPool;
        });
    }
    listUsers(poolId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing users');
            let result = [];
            const recursiveFunction = (paginationToken) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.cognitoSp().listUsers({
                    UserPoolId: poolId,
                    PaginationToken: paginationToken
                }).promise();
                result = result.concat(response.Users);
                if (response.PaginationToken) {
                    yield recursiveFunction(response.PaginationToken);
                }
            });
            yield recursiveFunction();
            debug('listed users');
            return result;
        });
    }
    signup(poolId, clientId, userName, password, attributeList, skipVerification = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!skipVerification) {
                debug('signing up: %s, clientId: %s, userName: %s, attr: %j', poolId, clientId, userName, attributeList);
                return new Promise((resolve, reject) => {
                    const poolData = this.getPoolData(poolId, clientId);
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
            }
            else {
                debug('admin create user: %s, clientId: %s, userName: %s, attr: %j', poolId, clientId, userName, attributeList);
                const rsp = yield this.cognitoSp().adminCreateUser({
                    UserPoolId: poolId,
                    Username: userName,
                    DesiredDeliveryMediums: ['EMAIL'],
                    ForceAliasCreation: false,
                    MessageAction: 'SUPPRESS',
                    TemporaryPassword: '!ItIsTemp01',
                    UserAttributes: attributeList.map(a => {
                        return { Name: a.getName(), Value: a.getValue() };
                    })
                }).promise();
                debug('admin created user');
                debug('admin set user password: %s, clientId: %s, userName: %s', poolId, clientId, userName);
                yield this.cognitoSp().adminSetUserPassword({
                    UserPoolId: poolId,
                    Username: rsp.User.Username,
                    Password: password,
                    Permanent: true
                }).promise();
                debug('admin did set user password');
                return {
                    user: this.getCognitoUser(poolId, clientId, userName),
                    userConfirmed: true,
                    userSub: rsp.User.Username,
                    codeDeliveryDetails: undefined
                };
            }
        });
    }
    login(poolId, clientId, userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticationData = {
                Username: userName,
                Password: password
            };
            const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails(authenticationData);
            return yield new Promise((resolve, reject) => {
                const user = this.getCognitoUser(poolId, clientId, userName);
                user.authenticateUser(authenticationDetails, {
                    onSuccess: (session) => resolve(session),
                    onFailure: (err) => reject(err)
                });
            });
        });
    }
    refresh(poolId, clientId, userName, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                const user = this.getCognitoUser(poolId, clientId, userName);
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
    getUser(poolId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cognitoSp().adminGetUser({
                UserPoolId: poolId,
                Username: userName
            }).promise();
        });
    }
    forgotPassword(poolId, clientId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                const user = this.getCognitoUser(poolId, clientId, userName);
                user.forgotPassword({
                    onSuccess: rsp => resolve(rsp),
                    onFailure: error => reject(error)
                });
            });
        });
    }
    confirmPassword(poolId, clientId, userName, verificationCode, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                const user = this.getCognitoUser(poolId, clientId, userName);
                user.confirmPassword(verificationCode, newPassword, {
                    onSuccess: () => resolve(),
                    onFailure: (error) => reject(error)
                });
            });
        });
    }
    deleteUser(poolId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('deleting user: %s, poolId: %s', userName, poolId);
            yield this.cognitoSp().adminDeleteUser({
                UserPoolId: poolId,
                Username: userName
            }).promise();
            debug('deleted user');
        });
    }
    addUserToGroup(poolId, userName, groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('adding user to group: %s, poolId: %s, group: %s', userName, poolId, groupName);
            yield this.cognitoSp().adminAddUserToGroup({
                UserPoolId: poolId,
                Username: userName,
                GroupName: groupName
            }).promise();
            debug('added user to group');
        });
    }
    removeUserFromGroup(poolId, userName, groupName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('removing user from group: %s, poolId: %s, group: %s', userName, poolId, groupName);
            yield this.cognitoSp().adminRemoveUserFromGroup({
                UserPoolId: poolId,
                Username: userName,
                GroupName: groupName
            }).promise();
            debug('removed user from group');
        });
    }
    listGroupsForUser(poolId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing groups for user: %s, poolId: %s', userName, poolId);
            const response = yield this.cognitoSp().adminListGroupsForUser({
                UserPoolId: poolId,
                Username: userName
            }).promise();
            return response.Groups.map(g => g.GroupName);
        });
    }
    globalSignOut(poolId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('globally signing out user: %s, poolId:', userName, poolId);
            yield this.cognitoSp().adminUserGlobalSignOut({
                UserPoolId: poolId,
                Username: userName
            }).promise();
            debug('globally signed out user');
        });
    }
}
exports.CognitoApi = CognitoApi;
