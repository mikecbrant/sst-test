"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
exports.response = response;
var appsyncjs_dynamo_1 = require("@mikecbrant/appsyncjs-dynamo");
function request(ctx) {
    var _a = ctx.args.input, id = _a.id, returnDeleted = _a.returnDeleted;
    return (0, appsyncjs_dynamo_1.deleteItem)({ key: { pk: id }, returnDeleted: Boolean(returnDeleted) });
}
function response(ctx) {
    var _a, _b;
    return (_b = (_a = ctx.result) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : null;
}
