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
exports.DynamoDbTable = void 0;
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
class DynamoDbTable extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, tableName) {
        super(parent);
        this.tableName = tableName;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.dynamoDb(this.config()).describeTable(this.tableName);
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.dynamoDb(this.config()).get({
                TableName: this.tableName,
                Key: key,
            });
        });
    }
    query(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            const keyConditionExpression = Object.keys(key)
                .map((k) => `${k} = :${k.toLowerCase()}`)
                .join(' and ');
            const expressionAttributeValues = {};
            Object.keys(key).forEach((k) => (expressionAttributeValues[`:${k.toLowerCase()}`] = key[k]));
            return AwsApi_1.AwsApi.dynamoDb(this.config()).query({
                TableName: this.tableName,
                KeyConditionExpression: keyConditionExpression,
                ExpressionAttributeValues: expressionAttributeValues,
            });
        });
    }
    queryByIndex(indexName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            const keyConditionExpression = Object.keys(key)
                .map((k) => `${k} = :${k.toLowerCase()}`)
                .join(' and ');
            const expressionAttributeValues = {};
            Object.keys(key).forEach((k) => (expressionAttributeValues[`:${k.toLowerCase()}`] = key[k]));
            return AwsApi_1.AwsApi.dynamoDb(this.config()).query({
                TableName: this.tableName,
                IndexName: indexName,
                KeyConditionExpression: keyConditionExpression,
                ExpressionAttributeValues: expressionAttributeValues,
            });
        });
    }
    put(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.dynamoDb(this.config()).put(this.tableName, item);
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.dynamoDb(this.config()).delete(this.tableName, key);
        });
    }
    batchGet(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.dynamoDb(this.config()).batchGet(this.tableName, keys);
        });
    }
}
exports.DynamoDbTable = DynamoDbTable;
