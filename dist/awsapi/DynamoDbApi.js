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
const debug = require('debug')('fluentaws:DynamoDbApi');
class DynamoDbApi {
    constructor() {
        this.dynamoDb = () => new AWS.DynamoDB();
        this.docClient = () => new AWS.DynamoDB.DocumentClient();
    }
    listTableNames() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing tables');
            const response = yield this.dynamoDb().listTables({}).promise();
            debug('listed tables');
            return response.TableNames;
        });
    }
    describeTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing table: %s', tableName);
            const response = yield this.dynamoDb().describeTable({
                TableName: tableName
            }).promise();
            debug('described table');
            return response.Table;
        });
    }
    get(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting item: %s, key: %j', input.TableName, input.Key);
            const response = yield this.docClient().get(input).promise();
            debug('got item');
            return response.Item;
        });
    }
    query(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('querying: %j', input);
            let result = [];
            const fnc = (fncInput) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.docClient().query(fncInput).promise();
                result = result.concat(response.Items || []);
                debug('#items: %d', response.Items.length);
                if (response.LastEvaluatedKey) {
                    const newInput = Object.assign({}, fncInput, { ExclusiveStartKey: response.LastEvaluatedKey });
                    debug('queries recursive: %j', newInput);
                    yield fnc(newInput);
                }
            });
            yield fnc(input);
            debug('queried');
            return result;
        });
    }
    put(tableName, item) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('putting item: %s, item: %j', tableName, item);
            yield this.docClient().put({
                TableName: tableName,
                Item: item
            }).promise();
            debug('put item');
        });
    }
    delete(tableName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('deleting item: %s, key: %j', tableName, key);
            yield this.docClient().delete({
                TableName: tableName,
                Key: key
            }).promise();
            debug('deleted item');
        });
    }
}
exports.DynamoDbApi = DynamoDbApi;
