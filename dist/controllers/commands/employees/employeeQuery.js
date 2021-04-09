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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helper = __importStar(require("../helpers/helper"));
const EmployeeHelper = __importStar(require("./helpers/employeeHelper"));
const EmployeeRepository = __importStar(require("../models/employeeModel"));
const resourceLookup_1 = require("../../../resourceLookup");
exports.queryById = (recordId) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.isBlankString(recordId)) {
        return Promise.reject({
            status: 422,
            message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_RECORD_ID_INVALID)
        });
    }
    return EmployeeRepository.queryById(recordId)
        .then((queriedEmployee) => {
        if (!queriedEmployee) {
            return Promise.reject({
                status: 404,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_NOT_FOUND)
            });
        }
        return Promise.resolve({
            status: 200,
            data: EmployeeHelper.mapEmployeeData(queriedEmployee)
        });
    });
});
exports.queryByEmployeeId = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.isBlankString(employeeId) || isNaN(Number(employeeId))) {
        return Promise.reject({
            status: 422,
            message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_EMPLOYEE_ID_INVALID)
        });
    }
    return EmployeeRepository.queryByEmployeeId(Number(employeeId))
        .then((queriedEmployee) => {
        if (!queriedEmployee) {
            return Promise.reject({
                status: 404,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_NOT_FOUND)
            });
        }
        return Promise.resolve({
            status: 200,
            data: EmployeeHelper.mapEmployeeData(queriedEmployee)
        });
    });
});
//# sourceMappingURL=employeeQuery.js.map