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
const ApiNode_1 = require("../node/ApiNode");
const AwsApi_1 = require("../awsapi/AwsApi");
class SnsTopic extends ApiNode_1.ApiNode {
    constructor(parent, arn) {
        super(parent);
        this.arn = arn;
    }
    publishJson(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.sns.publish({
                TopicArn: this.arn,
                Message: JSON.stringify(obj)
            });
        });
    }
}
exports.SnsTopic = SnsTopic;
