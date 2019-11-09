"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getStorageType_1 = __importDefault(require("./getStorageType"));
function retrieve(key, type) {
    var store = getStorageType_1.default(type, key);
    if (!store) {
        return {
            code: 404,
            message: "Data not found. Either the key contains no data or the data was stored under a different key."
        };
    }
    var parsed = JSON.parse(store);
    if (!parsed) {
        return {
            code: 500,
            message: "Data could not be parsed. Check your data or add a bug report to the github repository."
        };
    }
    return parsed;
}
exports.default = retrieve;
