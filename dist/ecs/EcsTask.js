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
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
class EcsTask extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, clusterId, idOrArn) {
        super(parent);
        this.clusterId = clusterId;
        this.idOrArn = idOrArn;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.ecs(this.config()).describeTask(this.clusterId, this.idOrArn);
    }
    /**
     * The EC2 instance that this task runs on.
     */
    ec2Instance() {
        if (!this.ec2InstanceInstance) {
            this.ec2InstanceInstance = ApiNodeFactory_1.ApiNodeFactory.ec2Instance(this, undefined);
            // We add a promise that will look up the EC2 instance id and feed it to the Ec2Instance
            this.promiseChain.add(() => __awaiter(this, void 0, void 0, function* () {
                const awsData = yield this.loadAwsData();
                const containerInstance = yield AwsApi_1.AwsApi.ecs(this.config()).describeContainerInstance(this.clusterId, awsData.containerInstanceArn);
                this.ec2InstanceInstance.instanceId = containerInstance.ec2InstanceId;
            }));
        }
        return this.ec2InstanceInstance;
    }
}
exports.EcsTask = EcsTask;
