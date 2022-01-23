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
exports.AutoScalingGroup = void 0;
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
/**
 * Representation of an AWS Autoscaling group.
 */
class AutoScalingGroup extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, name) {
        super(parent);
        this.name = name;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.autoScaling(this.config()).describeGroup(this.name);
    }
    ec2Instances() {
        if (!this.ec2InstanceCollection) {
            this.ec2InstanceCollection = ApiNodeFactory_1.ApiNodeFactory.ec2InstanceCollection(this);
            // Promise to determine the id's of all instances in the autoscaling group
            this.promiseChain.addVolatile(() => __awaiter(this, void 0, void 0, function* () {
                const awsData = yield this.loadAwsData();
                this.ec2InstanceCollection.instanceIds = awsData.Instances.map(x => x.InstanceId);
            }));
        }
        return this.ec2InstanceCollection;
    }
    updateSize(minSize, maxSize, desiredSize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.autoScaling(this.config()).update({
                AutoScalingGroupName: this.name,
                MinSize: minSize,
                MaxSize: maxSize,
                DesiredCapacity: desiredSize
            });
        });
    }
    setInstanceProtection(instanceIds, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AwsApi_1.AwsApi.autoScaling(this.config()).setInstanceProtection(this.name, instanceIds, value);
        });
    }
}
exports.AutoScalingGroup = AutoScalingGroup;
