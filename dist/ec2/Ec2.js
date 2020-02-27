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
const Ec2AccountAttributes_1 = require("./Ec2AccountAttributes");
const AwsApi_1 = require("./../awsapi/AwsApi");
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Ec2 extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.instanceCollection = ApiNodeFactory_1.ApiNodeFactory.ec2InstanceCollection(this);
    }
    instances() {
        return this.instanceCollection;
    }
    instance(id) {
        return this.instanceCollection.getById(id);
    }
    accountAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            const awsData = yield AwsApi_1.AwsApi.ec2.describeAccountAttributes();
            return Ec2AccountAttributes_1.Ec2AccountAttributesMapper.fromAwsData(awsData);
        });
    }
}
exports.Ec2 = Ec2;
