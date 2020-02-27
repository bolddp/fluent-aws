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
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
/**
 * Represents all the parameters in a region in Parameter Store. All parameters, including their decrypted values,
 * can be fetched by using the {@link #awsData()} method.
 */
class SystemsManagerParameterCollection extends ApiNodeCollection_1.ApiNodeCollection {
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            // We need to first load all parameter metadata and then iterate over the parameter names,
            // downloading 10 at a time, so this may take some time
            const parameters = yield AwsApi_1.AwsApi.systemsManager.describeParameters();
            const parameterNames = parameters.map(x => x.Name);
            let result = [];
            const recursiveFunction = (names) => __awaiter(this, void 0, void 0, function* () {
                const response = yield AwsApi_1.AwsApi.systemsManager.getParameters(names);
                result = result.concat(response);
                if (parameterNames.length > 0) {
                    yield recursiveFunction(parameterNames.splice(0, 10));
                }
            });
            yield recursiveFunction(parameterNames.splice(0, 10));
            return result;
        });
    }
    apiNodeFromAwsData(data) {
        return ApiNodeFactory_1.ApiNodeFactory.systemsManagerParameter(this, data.Name);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.systemsManagerParameter(this, id);
    }
    /**
     * Retrieves metadata for all parameters in Parameter Store.
     */
    metaData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.systemsManager.describeParameters();
        });
    }
    /**
     * Creates or updates a Parameter Store parameter.
     */
    put(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.systemsManager.putParameter(request);
        });
    }
}
exports.SystemsManagerParameterCollection = SystemsManagerParameterCollection;
