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
const ApiNode_1 = require("./ApiNode");
/**
 * An API node that can provide AWS data about itself.
 */
class AwsDataApiNode extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
    }
    /**
     * Returns the AWS Data, either by loading from the cache or by
     * getting it from the AWS SDK.
     */
    awsData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield this.loadAwsData();
        });
    }
}
exports.AwsDataApiNode = AwsDataApiNode;
