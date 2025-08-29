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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
// Swap in the util mock for AppSync runtime internals
vitest_1.vi.mock('@aws-appsync/utils', function () { return __awaiter(void 0, void 0, void 0, function () {
    var utilMock;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('@mikecbrant/appsyncjs-test-utils'); })];
            case 1:
                utilMock = (_a.sent()).utilMock;
                return [2 /*return*/, { util: utilMock }];
        }
    });
}); });
var dynamo = require("@mikecbrant/appsyncjs-dynamo");
(0, vitest_1.describe)('User resolvers', function () {
    (0, vitest_1.it)('get.request builds a valid GetItem request', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, ctx, actual, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./get.ts'); })];
                case 1:
                    mod = _a.sent();
                    ctx = { args: { id: 'e-123' } };
                    actual = mod.request(ctx);
                    expected = dynamo.getItem({ key: { pk: 'e-123' } });
                    (0, vitest_1.expect)(actual).toStrictEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('get.response returns the fetched entity or null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, ctxOk, ctxNull;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./get.ts'); })];
                case 1:
                    mod = _a.sent();
                    ctxOk = {
                        result: { id: 'e-1' },
                    };
                    (0, vitest_1.expect)(mod.response(ctxOk)).toStrictEqual({ id: 'e-1' });
                    ctxNull = { result: null };
                    (0, vitest_1.expect)(mod.response(ctxNull)).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('upsert.request builds an UpdateItem request that writes base fields and returns ALL_NEW', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, input, ctx, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./upsert.ts'); })];
                case 1:
                    mod = _a.sent();
                    input = { id: 'e-123' };
                    ctx = { args: { input: input } };
                    actual = mod.request(ctx);
                    (0, vitest_1.expect)(actual.operation).toBe('UpdateItem');
                    (0, vitest_1.expect)(actual.returnValues).toBe('ALL_NEW');
                    (0, vitest_1.expect)(actual.update).toBeDefined();
                    (0, vitest_1.expect)(actual.update.expression).toMatch(/^SET /);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('upsert.response returns the stored entity', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, ctx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./upsert.ts'); })];
                case 1:
                    mod = _a.sent();
                    ctx = {
                        result: { attributes: { id: 'e-1', createdAt: 't', updatedAt: 't' } },
                    };
                    (0, vitest_1.expect)(mod.response(ctx)).toStrictEqual({
                        id: 'e-1',
                        createdAt: 't',
                        updatedAt: 't',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('update.request builds an UpdateItem request that sets updatedAt and returns ALL_NEW', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, ctx, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./update.ts'); })];
                case 1:
                    mod = _a.sent();
                    ctx = {
                        args: { input: { id: 'e-1' } },
                    };
                    actual = mod.request(ctx);
                    (0, vitest_1.expect)(actual.operation).toBe('UpdateItem');
                    (0, vitest_1.expect)(actual.key).toStrictEqual(dynamo.updateItem({
                        key: { pk: 'e-1' },
                        update: {
                            expression: '',
                            expressionNames: {},
                            expressionValues: {},
                        },
                    }).key);
                    (0, vitest_1.expect)(actual.returnValues).toBe('ALL_NEW');
                    (0, vitest_1.expect)(actual.update).toBeDefined();
                    (0, vitest_1.expect)(actual.update.expression).toMatch(/SET/);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('update.response returns ALL_NEW attributes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, ctx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./update.ts'); })];
                case 1:
                    mod = _a.sent();
                    ctx = {
                        result: { attributes: { id: 'e-1', updatedAt: 't' } },
                    };
                    (0, vitest_1.expect)(mod.response(ctx)).toStrictEqual({ id: 'e-1', updatedAt: 't' });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('delete.request builds a valid DeleteItem request with input wrapper + returnDeleted', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, ctx, actual, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./delete.ts'); })];
                case 1:
                    mod = _a.sent();
                    ctx = {
                        args: { input: { id: 'e-123', returnDeleted: true } },
                    };
                    actual = mod.request(ctx);
                    expected = dynamo.deleteItem({
                        key: { pk: 'e-123' },
                        returnDeleted: true,
                    });
                    (0, vitest_1.expect)(actual).toStrictEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('delete.response returns deleted attributes when requested', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mod, ctx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./delete.ts'); })];
                case 1:
                    mod = _a.sent();
                    ctx = {
                        args: { input: { id: 'e-1', returnDeleted: true } },
                        result: { attributes: { id: 'e-1' } },
                    };
                    (0, vitest_1.expect)(mod.response(ctx)).toStrictEqual({ id: 'e-1' });
                    return [2 /*return*/];
            }
        });
    }); });
});
