"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLEARANCE_HIERARCHY = exports.SecurityClearance = void 0;
var SecurityClearance;
(function (SecurityClearance) {
    SecurityClearance["UNCLASSIFIED"] = "UNCLASSIFIED";
    SecurityClearance["RESTRICTED"] = "RESTRICTED";
    SecurityClearance["CONFIDENTIAL"] = "CONFIDENTIAL";
    SecurityClearance["SECRET"] = "SECRET";
    SecurityClearance["TOP_SECRET"] = "TOP_SECRET";
})(SecurityClearance || (exports.SecurityClearance = SecurityClearance = {}));
exports.CLEARANCE_HIERARCHY = {
    [SecurityClearance.UNCLASSIFIED]: 1,
    [SecurityClearance.RESTRICTED]: 2,
    [SecurityClearance.CONFIDENTIAL]: 3,
    [SecurityClearance.SECRET]: 4,
    [SecurityClearance.TOP_SECRET]: 5,
};
//# sourceMappingURL=abac.types.js.map