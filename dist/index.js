"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useFetch_1 = __importDefault(require("./useFetch"));
var retrieve_1 = __importDefault(require("./retrieve"));
exports.retrieve = retrieve_1.default;
exports.default = useFetch_1.default;
