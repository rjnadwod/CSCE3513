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
const DatabaseConnection = __importStar(require("../models/databaseConnection"));
const entityTypes_1 = require("../models/constants/entityTypes");
const buildUpdateObject = (employeeSaveRequest) => {
    const updateObject = {};
    if (employeeSaveRequest.active != null) {
        updateObject.active = employeeSaveRequest.active;
    }
    if (employeeSaveRequest.lastName != null) {
        updateObject.lastName = employeeSaveRequest.lastName;
    }
    if (employeeSaveRequest.firstName != null) {
        updateObject.firstName = employeeSaveRequest.firstName;
    }
    if (!Helper.isBlankString(employeeSaveRequest.password)) {
        updateObject.password = Buffer.from(EmployeeHelper.hashString(employeeSaveRequest.password));
    }
    if (employeeSaveRequest.classification != null) {
        updateObject.classification = employeeSaveRequest.classification;
    }
    if (!Helper.isBlankString(employeeSaveRequest.managerId)
        && Helper.isValidUUID(employeeSaveRequest.managerId)) {
        updateObject.managerId = employeeSaveRequest.managerId;
    }
    return updateObject;
};
const validateSaveRequest = (employeeSaveRequest) => {
    let errorMessage = "";
    if ((employeeSaveRequest.firstName != null)
        && (employeeSaveRequest.firstName.trim() === "")) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_FIRST_NAME_INVALID);
    }
    else if ((employeeSaveRequest.lastName != null)
        && (employeeSaveRequest.lastName.trim() === "")) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_LAST_NAME_INVALID);
    }
    else if ((employeeSaveRequest.password != null)
        && (employeeSaveRequest.password.trim() === "")) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_PASSWORD_INVALID);
    }
    else if ((employeeSaveRequest.classification != null)
        && (isNaN(employeeSaveRequest.classification)
            || !(employeeSaveRequest.classification in entityTypes_1.EmployeeClassification))) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_TYPE_INVALID);
    }
    else if ((employeeSaveRequest.managerId != null)
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
exports.execute = (employeeSaveRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResponse = validateSaveRequest(employeeSaveRequest);
    if (validationResponse.status !== 200) {
        return Promise.reject(validationResponse);
    }
    let updateTransaction;
    return DatabaseConnection.createTransaction()
        .then((createdTransaction) => {
        updateTransaction = createdTransaction;
        return EmployeeRepository.queryById(employeeSaveRequest.id, updateTransaction);
    }).then((queriedEmployee) => {
        if (queriedEmployee == null) {
            return Promise.reject({
                status: 404,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_NOT_FOUND)
            });
        }
        return queriedEmployee.update(buildUpdateObject(employeeSaveRequest), {
            transaction: updateTransaction
        });
    }).then((updatedEmployee) => {
        updateTransaction.commit();
        return {
            status: 200,
            data: EmployeeHelper.mapEmployeeData(updatedEmployee)
        };
    }).catch((error) => {
        if (updateTransaction != null) {
            updateTransaction.rollback();
        }
        return Promise.reject({
            status: (error.status || 500),
            message: (error.messsage
                || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_UNABLE_TO_SAVE))
        });
    });
});
//# sourceMappingURL=employeeUpdateCommand.js.map