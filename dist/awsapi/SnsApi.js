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
const AWS = require("aws-sdk");
const debug = require('debug')('fluentaws:SnsApi');
class SnsApi {
    constructor(config) {
        this.sns = () => new AWS.SNS(this.config);
        this.config = config;
    }
    listTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing topics');
            const response = yield this.sns().listTopics().promise();
            debug('listed topics');
            return response.Topics;
        });
    }
    publish(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('publishing: %j', input);
            const response = yield this.sns().publish(input).promise();
            debug('published');
        });
    }
}
exports.SnsApi = SnsApi;
