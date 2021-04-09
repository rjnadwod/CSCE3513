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
const employeeModel_1 = require("../models/employeeModel");
const EmployeeHelper = __importStar(require("./helpers/employeeHelper"));
const resourceLookup_1 = require("../../../resourceLookup");
const entityTypes_1 = require("../models/constants/entityTypes");
const validateSaveRequest = (employeeSaveRequest, isInitialEmployee = false) => {
    let errorMessage = "";
    if (Helper.isBlankString(employeeSaveRequest.firstName)) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_FIRST_NAME_INVALID);
    }
    else if (Helper.isBlankString(employeeSaveRequest.lastName)) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_LAST_NAME_INVALID);
    }
    else if (Helper.isBlankString(employeeSaveRequest.password)) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_PASSWORD_INVALID);
    }
    else if (!isInitialEmployee
        && ((employeeSaveRequest.classification == null)
            || isNaN(employeeSaveRequest.classification)
            || !(employeeSaveRequest.classification in entityTypes_1.EmployeeClassification))) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_TYPE_INVALID);
    }
    else if (!Helper.isBlankString(employeeSaveRequest.managerId)
        && !Helper.isValidUUID(employeeSaveRequest.managerId)) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_MANAGER_ID_INVALID);
    }
    return ((errorMessage === "")
        ? { status: 200 }
        : {
            status: 422,
            message: errorMessage
        });
};
exports.execute = (employeeSaveRequest, isInitialEmployee = false) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResponse = validateSaveRequest(employeeSaveRequest, isInitialEmployee);
    if (validationResponse.status !== 200) {
        return Promise.reject(validationResponse);
    }
    const employeeToCreate = {
        active: true,
        lastName: employeeSaveRequest.lastName,
        firstName: employeeSaveRequest.firstName,
        managerId: employeeSaveRequest.managerId,
        classification: (!isInitialEmployee
            ? employeeSaveRequest.classification
            : entityTypes_1.EmployeeClassification.GeneralManager),
        password: Buffer.from(EmployeeHelper.hashString(employeeSaveRequest.password))
    };
    return employeeModel_1.EmployeeModel.create(employeeToCreate)
        .then((createdEmployee) => {
        return {
            status: 201,
            data: EmployeeHelper.mapEmployeeData(createdEmployee)
        };
    });
});
//# sourceMappingURL=employeeCreateCommand.js.map