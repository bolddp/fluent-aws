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
exports.SqsQueue = void 0;
const AwsApi_1 = require("../awsapi/AwsApi");
const ApiNode_1 = require("../node/ApiNode");
class SqsQueue extends ApiNode_1.ApiNode {
    constructor(parent, url) {
        super(parent);
        this.url = url;
    }
    sendJson(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            yield AwsApi_1.AwsApi.sqs(this.config()).sendMessage({
                QueueUrl: this.url,
                MessageBody: JSON.stringify(obj),
            });
        });
    }
    sendJsonBatch(objs) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            // Create batches of 10 messages in each
            let batches = [];
            for (let i = 0; i < objs.length; i += 10) {
                batches.push(objs.slice(i, i + 10));
            }
            for (const batch of batches) {
                yield AwsApi_1.AwsApi.sqs(this.config()).sendMessageBatch({
                    QueueUrl: this.url,
                    Entries: batch.map((obj, index) => ({
                        Id: index.toString(),
                        MessageBody: JSON.stringify(obj),
                    })),
                });
            }
        });
    }
}
exports.SqsQueue = SqsQueue;
