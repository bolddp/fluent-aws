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
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class KmsAlias extends ApiNode_1.ApiNode {
    constructor(parent, aliasName) {
        super(parent);
        this.aliasName = aliasName;
    }
    key() {
        if (!this.kmsKeyInstance) {
            this.kmsKeyInstance = ApiNodeFactory_1.ApiNodeFactory.kmsKey(this, undefined);
            // We add a promise that will lazy loads the correct id of the key
            this.promiseChain.add(() => __awaiter(this, void 0, void 0, function* () {
                const aliases = yield AwsApi_1.AwsApi.kms.listAliases();
                const alias = aliases.find(x => x.AliasName == this.aliasName);
                if (!alias) {
                    throw new Error(`Alias not found: ${this.aliasName}`);
                }
                if (!alias.TargetKeyId) {
                    throw new Error(`Alias does not reference any key: ${this.aliasName}`);
                }
                this.kmsKeyInstance.id = alias.TargetKeyId;
            }));
        }
        return this.kmsKeyInstance;
    }
}
exports.KmsAlias = KmsAlias;
