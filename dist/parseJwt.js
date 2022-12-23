"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwt = void 0;
function parseJwt(token) {
    var base64Payload = token.split(".")[1];
    var payload = Buffer.from(base64Payload, "base64");
    return JSON.parse(payload.toString());
}
exports.parseJwt = parseJwt;
