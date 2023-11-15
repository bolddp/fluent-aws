"use strict";
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
exports.DynamoDb = void 0;
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
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
    client() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.dynamoDb(this.config()).getDynamoDb();
        });
    }
    docClient() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.dynamoDb(this.config()).getDocClient();
        });
    }
}
exports.DynamoDb = DynamoDb;
