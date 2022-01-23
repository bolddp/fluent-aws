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
exports.Ec2Instance = void 0;
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Ec2Instance extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, instanceId) {
        super(parent);
        this.instanceId = instanceId;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.ec2(this.config()).describeInstance(this.instanceId);
    }
    iamRole() {
        if (!this.iamRoleInstance) {
            this.iamRoleInstance = ApiNodeFactory_1.ApiNodeFactory.iamRole(this, undefined);
            // Add a promise that feeds the correct role name to the IamRole instance
            this.promiseChain.add(() => __awaiter(this, void 0, void 0, function* () {
                const awsData = yield this.loadAwsData();
                if (!awsData.IamInstanceProfile) {
                    throw new Error('EC2 instance has no IAM role');
                }
                const instanceProfile = yield AwsApi_1.AwsApi.iam(this.config()).getInstanceProfile(awsData.IamInstanceProfile.Arn.split('/')[1]);
                if (instanceProfile.Roles.length == 0) {
                    throw new Error(`No role in EC2 instance profile (profile ARN: ${awsData.IamInstanceProfile.Arn})`);
                }
                this.iamRoleInstance.name = instanceProfile.Roles[0].RoleName;
            }));
        }
        return this.iamRoleInstance;
    }
}
exports.Ec2Instance = Ec2Instance;
