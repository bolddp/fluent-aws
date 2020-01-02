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
 * Base class for nodes that represents a collection in the API, e.g.
 * all the EC2 instances in the account or all services in an ECS cluster.
 */
class ApiNodeCollection extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.nodeMap = new Map();
    }
    /**
     * Looks for an API Node by its id, e.g. the InstanceId of an EC2 instance.
     * If none is found, an instance is created and added to the map.
     */
    getById(id) {
        let item = this.nodeMap.get(id);
        if (!item) {
            item = this.apiNodeFromId(id);
            this.nodeMap.set(id, item);
        }
        return item;
    }
    find(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            const result = [];
            const awsDatas = yield this.load();
            for (const awsData of awsDatas) {
                if (predicate(awsData)) {
                    result.push(this.apiNodeFromAwsData(awsData));
                }
            }
            return result;
        });
    }
    /**
     * Retrieves the AWS SDK data for this collection.
     */
    awsData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return yield this.load();
        });
    }
}
exports.ApiNodeCollection = ApiNodeCollection;
