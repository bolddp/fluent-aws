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
exports.SqsApi = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const debug = require('debug')('fluentaws:SnsApi');
class SqsApi {
    constructor(config) {
        this.config = config;
        this.sqs = () => new client_sqs_1.SQS(this.config);
    }
    listQueueUrls() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing queues');
            const response = yield this.sqs().listQueues({});
            debug('listed queues');
            return response.QueueUrls;
        });
    }
    sendMessage(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('send message: %j', input);
            const response = yield this.sqs().sendMessage(input);
            debug('sent message');
        });
    }
    sendMessageBatch(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('send message batch: %j', input);
            const response = yield this.sqs().sendMessageBatch(input);
            debug('sent message batch');
        });
    }
}
exports.SqsApi = SqsApi;
