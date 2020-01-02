"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Kms extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.keyCollection = ApiNodeFactory_1.ApiNodeFactory.kmsKeyCollection(this);
        this.aliasCollection = ApiNodeFactory_1.ApiNodeFactory.kmsAliasCollection(this);
    }
    aliases() {
        return this.aliasCollection;
    }
    alias(id) {
        return this.aliasCollection.getById(id);
    }
    keys() {
        return this.keyCollection;
    }
    key(keyId) {
        return this.keyCollection.getById(keyId);
    }
}
exports.Kms = Kms;
