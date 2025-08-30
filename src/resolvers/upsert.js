"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
exports.response = response;
var appsyncjs_dynamo_1 = require("@mikecbrant/appsyncjs-dynamo");
var utils_1 = require("@aws-appsync/utils");
function request(ctx) {
    var id = ctx.args.input.id;
    var now = new Date().toISOString();
    var update = {
        expression: 'SET #id = if_not_exists(#id, :id), #createdAt = if_not_exists(#createdAt, :now), #updatedAt = :now',
        expressionNames: {
            '#id': 'id',
            '#createdAt': 'createdAt',
            '#updatedAt': 'updatedAt',
        },
        expressionValues: utils_1.util.dynamodb.toMapValues({ ':id': id, ':now': now }),
    };
    var req = (0, appsyncjs_dynamo_1.updateItem)({ key: { pk: id }, update: update });
    return __assign(__assign({}, req), { returnValues: 'ALL_NEW' });
}
function response(ctx) {
    var _a, _b;
    return (_b = (_a = ctx.result) === null || _a === void 0 ? void 0 : _a.attributes) !== null && _b !== void 0 ? _b : null;
}
