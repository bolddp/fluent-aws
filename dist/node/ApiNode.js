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
exports.ApiNode = void 0;
const PromiseChain_1 = require("./PromiseChain");
const debug = require('debug')('fluentaws:ApiNode');
/**
 * A node in the fluent API hierarchy. The responsibility of a node in the
 * hierarchy, e.g. an Ec2 or EcsTask instance, is to resolve its parent
 * before it resolves itself to make sure that all pending promises are executed.
 */
class ApiNode {
    constructor(parent) {
        this.isResolving = false;
        this.parent = parent;
        this.promiseChain = new PromiseChain_1.PromiseChain();
    }
    config() {
        return this.parent.config();
    }
    /**
     * Ensures that the API node is resolved, which means that the promise chains of itself and
     * all its parents are executed to make sure any deferred actions are carried out before
     * trying to operate on this object.
     *
     * One example is when accessing the EC2 instance of a specific ECS task
     * { @code task('taskArn').ec2Instance().awsData() }. Before being able to operate on the EC2
     * instance, like reading its awsData(), the task must be queried to get the EC2 instance id.
     * This query is added to the promise chain of the ECS task when the ec2Instance() method is
     * called, but not carried out until an actual operation on the EC2 instance is performed.
     *
     * Any AWS SDK operation on an API node needs to start by calling ensureResolved() to make
     * sure that all pending operations have been carried out.
     */
    ensureResolved() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isResolving) {
                this.isResolving = true;
                try {
                    if (this.parent) {
                        yield this.parent.ensureResolved();
                    }
                    yield this.promiseChain.resolve();
                }
                finally {
                    this.isResolving = false;
                }
            }
            else {
                debug('WARN : ensureResolved() called recursively, please make sure that awsData() or ensureResolved() aren\'t used inside promise chains, instead use loadAwsData()');
            }
        });
    }
}
exports.ApiNode = ApiNode;
