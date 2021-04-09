"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const entityTypes_1 = require("../../models/constants/entityTypes");
const employeeIdBase = "00000";
exports.hashString = (toHash) => {
    const hash = crypto.createHash("sha256");
    hash.update(toHash);
    return hash.digest("hex");
};
exports.padEmployeeId = (employeeId) => {
    const employeeIdAsString = employeeId.toString();
    return (employeeIdBase + employeeIdAsString)
        .slice(-Math.max(employeeIdBase.length, employeeIdAsString.length));
};
exports.mapEmployeeData = (queriedEmployee) => {
    return {
        id: queriedEmployee.id,
        active: queriedEmployee.active,
        lastName: queriedEmployee.lastName,
        createdOn: queriedEmployee.createdOn,
        firstName: queriedEmployee.firstName,
        managerId: queriedEmployee.managerId,
        employeeId: exports.padEmployeeId(queriedEmployee.employeeId),
        classification: queriedEmployee.classification
    };
};
exports.isElevatedUser = (employeeClassification) => {
    return ((employeeClassification === entityTypes_1.EmployeeClassification.GeneralManager)
        || (employeeClassification === entityTypes_1.EmployeeClassification.ShiftManager));
};
//# sourceMappingURL=employeeHelper.js.map