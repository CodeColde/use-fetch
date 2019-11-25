"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeStorageType(type, key) {
    switch (type) {
        case "local":
            localStorage.removeItem(key);
            break;
        case "session":
            sessionStorage.removeItem(key);
            break;
        default:
            throw new Error("Storage Type is undefined");
    }
}
exports.default = removeStorageType;
