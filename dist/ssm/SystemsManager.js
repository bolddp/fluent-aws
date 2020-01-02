"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class SystemsManager extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.parameterCollection = ApiNodeFactory_1.ApiNodeFactory.systemsManagerParameterCollection(this);
    }
    parameters() {
        return this.parameterCollection;
    }
    parameter(parameterName) {
        return this.parameterCollection.getById(parameterName);
    }
}
exports.SystemsManager = SystemsManager;
