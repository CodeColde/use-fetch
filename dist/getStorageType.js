"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStorageType(type, key) {
    if (!key)
        return false;
    switch (type) {
        case "local":
            return localStorage.getItem(key);
        case "session":
            return sessionStorage.getItem(key);
        default:
            return false;
    }
}
exports.default = getStorageType;
