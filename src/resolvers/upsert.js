"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
exports.response = response;
var appsyncjs_dynamo_1 = require("@mikecbrant/appsyncjs-dynamo");
function request(ctx) {
    var id = ctx.args.input.id;
    var now = new Date().toISOString();
    return (0, appsyncjs_dynamo_1.putItem)({
        key: { pk: id },
        item: { id: id, createdAt: now, updatedAt: now },
    });
}
function response(ctx) {
    var _a, _b;
    return (_b = (_a = ctx.result) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : null;
}
