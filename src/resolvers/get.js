"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
exports.response = response;
var appsyncjs_dynamo_1 = require("@mikecbrant/appsyncjs-dynamo");
function request(ctx) {
    var id = ctx.args.id;
    return (0, appsyncjs_dynamo_1.getItem)({ key: { pk: id } });
}
function response(ctx) {
    var _a;
    return (_a = ctx.result) !== null && _a !== void 0 ? _a : null;
}
