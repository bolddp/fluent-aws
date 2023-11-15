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
exports.DynamoDbApi = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const debug = require('debug')('fluentaws:DynamoDbApi');
class DynamoDbApi {
    constructor(config) {
        this.config = config;
        this.dynamoDb = () => new client_dynamodb_1.DynamoDB(this.config);
        this.docClient = () => lib_dynamodb_1.DynamoDBDocument.from(this.dynamoDb(), {
            marshallOptions: {
                removeUndefinedValues: true,
            },
        });
    }
    getDynamoDb() {
        return this.dynamoDb();
    }
    getDocClient() {
        return this.docClient();
    }
    listTableNames() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing tables');
            const response = yield this.dynamoDb().listTables({});
            debug('listed tables');
            return response.TableNames;
        });
    }
    describeTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing table: %s', tableName);
            const response = yield this.dynamoDb().describeTable({
                TableName: tableName,
            });
            debug('described table');
            return response.Table;
        });
    }
    get(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting item: %s, key: %j', input.TableName, input.Key);
            const response = yield this.docClient().get(input);
            debug('got item');
            return response.Item;
        });
    }
    query(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('querying: %j', input);
            let result = [];
            const fnc = (fncInput) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.docClient().query(fncInput);
                result = result.concat(response.Items || []);
                debug('#items: %d', response.Items.length);
                if (response.LastEvaluatedKey) {
                    const newInput = Object.assign(Object.assign({}, fncInput), { ExclusiveStartKey: response.LastEvaluatedKey });
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
                Item: item,
            });
            debug('put item');
        });
    }
    delete(tableName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('deleting item: %s, key: %j', tableName, key);
            yield this.docClient().delete({
                TableName: tableName,
                Key: key,
            });
            debug('deleted item');
        });
    }
    batchGet(tableName, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('batchGet: %s, #keys: %d', tableName, keys.length);
            const batchSize = 100;
            const batches = keys.reduce((acc, key, index) => {
                const batchIndex = Math.floor(index / batchSize);
                if (index % batchSize == 0) {
                    acc[batchIndex] = [];
                }
                acc[batchIndex].push(key);
                return acc;
            }, []);
            let result = [];
            for (const keyBatch of batches) {
                debug('getting batch of %d', keyBatch.length);
                const rsp = yield this.docClient().batchGet({
                    RequestItems: {
                        [tableName]: {
                            ConsistentRead: true,
                            Keys: keyBatch,
                        },
                    },
                });
                debug('did get batch');
                result.push(...rsp.Responses[tableName]);
            }
            debug('did batchGet');
            return result;
        });
    }
}
exports.DynamoDbApi = DynamoDbApi;
