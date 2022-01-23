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
exports.DynamoDbApi = void 0;
const AWS = __importStar(require("aws-sdk"));
const debug = require('debug')('fluentaws:DynamoDbApi');
class DynamoDbApi {
    constructor(config) {
        this.dynamoDb = () => new AWS.DynamoDB(this.config);
        this.docClient = () => new AWS.DynamoDB.DocumentClient(this.config);
        this.config = config;
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
    batchGet(tableName, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('batchGet: %s, #keys: %d', tableName, keys.length);
            const batchSize = 100;
            const batches = keys.reduce((acc, key, index) => {
                const batchIndex = Math.floor(index / batchSize);
                if ((index % batchSize) == 0) {
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
                            Keys: keyBatch
                        }
                    }
                }).promise();
                debug('did get batch');
                result.push(...rsp.Responses[tableName]);
            }
            debug('did batchGet');
            return result;
        });
    }
}
exports.DynamoDbApi = DynamoDbApi;
