"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setStorageType(type, key, data) {
    switch (type) {
        case "local":
            localStorage.setItem(key, data);
            break;
        case "session":
            sessionStorage.setItem(key, data);
            break;
        default:
            throw new Error("Storage Type is undefined");
    }
}
exports.default = setStorageType;
