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
exports.SnsApi = void 0;
const client_sns_1 = require("@aws-sdk/client-sns");
const debug = require('debug')('fluentaws:SnsApi');
class SnsApi {
    constructor(config) {
        this.config = config;
        this.sns = () => new client_sns_1.SNS(this.config);
    }
    listTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing topics');
            const response = yield this.sns().listTopics({});
            debug('listed topics');
            return response.Topics;
        });
    }
    publish(input) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('publishing: %j', input);
            const response = yield this.sns().publish(input);
            debug('published');
        });
    }
}
exports.SnsApi = SnsApi;
