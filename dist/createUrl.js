"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createUrl(urlString, urlParams) {
    var urlObject = new URL(urlString);
    if (urlParams) {
        Object.keys(urlParams).forEach(function (key) { return urlObject.searchParams.append(key, urlParams[key]); });
    }
    return urlObject;
}
exports.default = createUrl;
