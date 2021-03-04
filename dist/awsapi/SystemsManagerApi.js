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
const debug = require('debug')('fluentaws:SystemsManagerApi');
class SystemsManagerApi {
    constructor(config) {
        this.ssm = () => new AWS.SSM(this.config);
        this.config = config;
    }
    describeParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing parameters');
            let result = [];
            const recursiveFunction = (nextToken) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.ssm().describeParameters({
                    NextToken: nextToken
                }).promise();
                result = result.concat(response.Parameters);
                if (response.NextToken) {
                    yield recursiveFunction(response.NextToken);
                }
            });
            yield recursiveFunction();
            debug('described parameters');
            return result;
        });
    }
    describeParameter(parameterName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing parameter: %s', parameterName);
            const response = yield this.ssm().describeParameters({
                Filters: [{
                        Key: 'Name',
                        Values: [parameterName]
                    }]
            }).promise();
            if (response.Parameters.length == 0) {
                throw new Error(`Parameter not found: ${parameterName}`);
            }
            debug('described parameter');
            return response.Parameters[0];
        });
    }
    getParameter(parameterName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting parameter: %s', parameterName);
            const response = yield this.ssm().getParameter({
                Name: parameterName,
                WithDecryption: true
            }).promise();
            if (!response.Parameter) {
                throw new Error(`Parameter not found: ${parameterName}`);
            }
            debug('got parameter');
            return response.Parameter;
        });
    }
    getParameters(names, withDecryption = true) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting parameters: %j', names);
            const response = yield this.ssm().getParameters({
                Names: names,
                WithDecryption: withDecryption
            }).promise();
            debug('got parameters');
            return response.Parameters;
        });
    }
    getParametersByPath(path, withDecryption = true) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting parameters by path: %s', path);
            let result = [];
            const recursiveFunction = (nextToken) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.ssm().getParametersByPath({
                    Path: path,
                    WithDecryption: withDecryption,
                    NextToken: nextToken
                }).promise();
                result = result.concat(response.Parameters);
                if (response.NextToken) {
                    yield recursiveFunction(response.NextToken);
                }
            });
            yield recursiveFunction();
            debug('got parameters by path');
            return result;
        });
    }
    putParameter(request) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('putting parameter: %j', request);
            yield this.ssm().putParameter(request).promise();
            debug('put parameter');
        });
    }
}
exports.SystemsManagerApi = SystemsManagerApi;
