"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CognitoUserPool = void 0;
const AmazonCognitoIdentity = __importStar(require("amazon-cognito-identity-js"));
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const AwsApi_1 = require("../awsapi/AwsApi");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class CognitoUserPool extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, id) {
        super(parent);
        this.id = id;
        this.userCollection = ApiNodeFactory_1.ApiNodeFactory.cognitoUserCollection(this, this.id);
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.cognito(this.config()).describeUserPool(this.id.poolId);
    }
    users() {
        return this.userCollection;
    }
    user(userName) {
        return this.userCollection.getById(userName);
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
            return yield AwsApi_1.AwsApi.cognito(this.config()).signup(this.id.poolId, this.id.clientId, signupData.userName, signupData.password, attributeList, signupData.skipVerification);
        });
    }
    /**
     * Requests a verification code for a user with a specific email address. This verification code then
     * needs to be used together with a new password to perform the reset. This is done through the
     * {@link #resetPassword} function.
     */
    requestForgotPasswordCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.cognito(this.config()).forgotPassword(this.id.poolId, this.id.clientId, email);
        });
    }
    /**
     * Sets a new password for a user.
     * @param email the email of the user whose password should be reset
     * @param verificationCode the verification code
     * @param password the new password
     */
    setNewUserPassword(email, verificationCode, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.cognito(this.config()).confirmPassword(this.id.poolId, this.id.clientId, email, verificationCode, password);
        });
    }
}
exports.CognitoUserPool = CognitoUserPool;
CognitoUserPool.cognitoAttrIdMap = {
    'address': 'address', 'birthDate': 'birthdate', 'email': 'email', 'familyName': 'family_name', 'gender': 'gender', 'givenName': 'given_name',
    'locale': 'locale', 'middleName': 'middle_name', 'name': 'name', 'nickname': 'nickname', 'phoneNumber': 'phone_number', 'picture': 'picture',
    'preferredUserName': 'preferred_username', 'profile': 'profile', 'timezone': 'timezone', 'updatedAt': 'updated_at', 'website': 'website'
};
