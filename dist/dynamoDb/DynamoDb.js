"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDb = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class DynamoDb extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.tableCollection = ApiNodeFactory_1.ApiNodeFactory.dynamoDbTableCollection(this);
    }
    tables() {
        return this.tableCollection;
    }
    table(id) {
        return this.tableCollection.getById(id);
    }
}
exports.DynamoDb = DynamoDb;
