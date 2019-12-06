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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var getStorageType_1 = __importDefault(require("./getStorageType"));
var setStorageType_1 = __importDefault(require("./setStorageType"));
var removeStorageType_1 = __importDefault(require("./removeStorageType"));
function useFetch(url, payload, key, type) {
    var items = getStorageType_1.default(type, key);
    var _a = react_1.useState(key), curr = _a[0], setCurr = _a[1];
    var _b = react_1.useState(), error = _b[0], setError = _b[1];
    var _c = react_1.useState(items ? JSON.parse(items) : []), data = _c[0], setData = _c[1];
    var _d = react_1.useState(!items), loading = _d[0], setLoading = _d[1];
    function fetchData() {
        return __awaiter(this, void 0, void 0, function () {
            var requestUrl, response, json, err_1, val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        requestUrl = typeof url === 'string' ? url : url.toString();
                        return [4, fetch(requestUrl, payload)];
                    case 2:
                        response = _a.sent();
                        return [4, response.json()];
                    case 3:
                        json = _a.sent();
                        if (response.ok) {
                            setData(json);
                            setLoading(false);
                            if (!!key && !!type) {
                                setStorageType_1.default(type, key, JSON.stringify(json));
                            }
                        }
                        else {
                            throw {
                                status: response.status,
                                message: response.statusText,
                                body: json,
                            };
                        }
                        return [3, 6];
                    case 4:
                        err_1 = _a.sent();
                        val = {
                            isError: true,
                            code: err_1.status,
                            message: err_1.message,
                            body: err_1.body
                        };
                        setLoading(false);
                        setError(val);
                        return [3, 6];
                    case 5:
                        if (error && !!type && !!key) {
                            removeStorageType_1.default(type, key);
                        }
                        return [7];
                    case 6: return [2];
                }
            });
        });
    }
    react_1.useEffect(function () {
        if (key !== curr) {
            var results = getStorageType_1.default(type, key);
            setData(results ? JSON.parse(results) : []);
            setCurr(key);
        }
        if (!items && !error) {
            fetchData();
        }
    }, [items, url, key, type, error]);
    return error ? [loading, error] : [loading, data];
}
exports.default = useFetch;
