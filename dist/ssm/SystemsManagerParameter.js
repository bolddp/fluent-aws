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
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const AwsApi_1 = require("../awsapi/AwsApi");
/**
 * Represents a parameter in Systems Manager Parameter Store.
 */
class SystemsManagerParameter extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, parameterName) {
        super(parent);
        this.parameterName = parameterName;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.systemsManager.getParameter(this.parameterName);
    }
    /**
     * Returns the metadata for this parameter.
     */
    metaData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.systemsManager.describeParameter(this.parameterName);
        });
    }
}
exports.SystemsManagerParameter = SystemsManagerParameter;
