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
exports.Route53RecordSetCollection = void 0;
const AwsApi_1 = require("../awsapi/AwsApi");
const AwsDataApiNode_1 = require("../node/AwsDataApiNode");
class Route53RecordSetCollection extends AwsDataApiNode_1.AwsDataApiNode {
    constructor(parent, hostedZoneId) {
        super(parent);
        this.hostedZoneId = hostedZoneId;
    }
    loadAwsData() {
        return AwsApi_1.AwsApi.route53(this.config()).listRecordSets(this.hostedZoneId);
    }
    create(recordSet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.route53(this.config()).createRecordSet(this.hostedZoneId, recordSet);
        });
    }
    /**
     * Deletes a record set from the the collection.
     */
    delete(recordSet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.route53(this.config()).deleteRecordSet(this.hostedZoneId, recordSet);
        });
    }
}
exports.Route53RecordSetCollection = Route53RecordSetCollection;
