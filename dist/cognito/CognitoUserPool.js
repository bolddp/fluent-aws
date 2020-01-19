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
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const AwsApi_1 = require("../awsapi/AwsApi");
class CognitoUserPool extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, id) {
        super(parent);
        this.id = id;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.cognito.describeUserPool(this.id.poolId);
    }
    signup(signupData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            const attributeList = [];
            // First map the standard attributes
            for (const key of Object.keys(signupData.attributes)) {
                const cognitoAttrId = CognitoUserPool.cognitoAttrIdMap[key];
                if (cognitoAttrId) {
                    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
                        Name: cognitoAttrId,
                        Value: signupData.attributes[key]
                    }));
                }
            }
            // Then map any custom attributes
            if (signupData.attributes.custom) {
                for (const key of Object.keys(signupData.attributes.custom)) {
                    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
                        Name: `custom:${key}`,
                        Value: signupData.attributes.custom[key]
                    }));
                }
            }
            return AwsApi_1.AwsApi.cognito.signup(this.id.poolId, this.id.clientId, signupData.userName, signupData.password, attributeList);
        });
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.cognito.login(this.id.poolId, this.id.clientId, loginData.userName, loginData.password);
        });
    }
    refresh(refreshData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.cognito.refresh(this.id.poolId, this.id.clientId, refreshData.userName, refreshData.token);
        });
    }
}
CognitoUserPool.cognitoAttrIdMap = {
    'address': 'address', 'birthDate': 'birthdate', 'email': 'email', 'familyName': 'family_name', 'gender': 'gender', 'givenName': 'given_name',
    'locale': 'locale', 'middleName': 'middle_name', 'name': 'name', 'nickname': 'nickname', 'phoneNumber': 'phone_number', 'picture': 'picture',
    'preferredUserName': 'preferred_username', 'profile': 'profile', 'timezone': 'timezone', 'updatedAt': 'updated_at', 'website': 'website'
};
exports.CognitoUserPool = CognitoUserPool;
