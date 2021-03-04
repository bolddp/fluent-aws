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
const debug = require('debug')('fluentaws:CloudFormationStack');
class CloudFormationStack extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, stackName) {
        super(parent);
        this.stackName = stackName;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.cloudFormation(this.config()).describeStack(this.stackName);
    }
    /**
     * Returns summaries of all resources in the stack.
     */
    resources() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cloudFormation(this.config()).listStackResources(this.stackName);
        });
    }
    /**
     * Returns the template of the stack, including new lines.
     */
    template() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield AwsApi_1.AwsApi.cloudFormation(this.config()).getTemplate(this.stackName);
        });
    }
    /**
     * Checks the stack for drift information, e.g. resources whose attributes have changed compared to the
     * template that was used when the stack was created or last updated. NOTE! This is an operation that
     * may take several minutes.
     */
    checkDrift(pauseMilliseconds = 10000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            const driftDetectionId = yield AwsApi_1.AwsApi.cloudFormation(this.config()).detectStackDrift(this.stackName);
            while (true) {
                // Pause for 10 seconds
                yield new Promise((resolve) => setTimeout(() => resolve(), pauseMilliseconds));
                const status = yield AwsApi_1.AwsApi.cloudFormation(this.config()).describeStackDriftDetectionStatus(driftDetectionId);
                switch (status) {
                    case 'DETECTION_FAILED':
                        const drifts = yield AwsApi_1.AwsApi.cloudFormation(this.config()).describeStackResourceDrifts(this.stackName);
                        throw new Error(`Drift detection failed! Available drift info: ${JSON.stringify(drifts)}`);
                    case 'DETECTION_COMPLETE':
                        return yield AwsApi_1.AwsApi.cloudFormation(this.config()).describeStackResourceDrifts(this.stackName);
                }
            }
        });
    }
}
exports.CloudFormationStack = CloudFormationStack;
