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
const Helper = __importStar(require("./helpers/routeControllerHelper"));
const resourceLookup_1 = require("../resourceLookup");
const EmployeeQuery = __importStar(require("./commands/employees/employeeQuery"));
const EmployeeHelper = __importStar(require("./commands/employees/helpers/employeeHelper"));
const EmployeeCreateCommand = __importStar(require("./commands/employees/employeeCreateCommand"));
const EmployeeUpdateCommand = __importStar(require("./commands/employees/employeeUpdateCommand"));
const EmployeeExistsQuery = __importStar(require("./commands/employees/activeEmployeeExistsQuery"));
const ValidateActiveUser = __importStar(require("./commands/activeUsers/validateActiveUserCommand"));
const routingLookup_1 = require("./lookups/routingLookup");
const entityTypes_1 = require("./commands/models/constants/entityTypes");
const buildEmployeeTypes = () => {
    const employeeTypes = [];
    employeeTypes.push({
        value: entityTypes_1.EmployeeClassification.NotDefined,
        label: entityTypes_1.EmployeeClassificationLabel.NotDefined
    });
    employeeTypes.push({
        value: entityTypes_1.EmployeeClassification.Cashier,
        label: entityTypes_1.EmployeeClassificationLabel.Cashier
    });
    employeeTypes.push({
        value: entityTypes_1.EmployeeClassification.ShiftManager,
        label: entityTypes_1.EmployeeClassificationLabel.ShiftManager
    });
    employeeTypes.push({
        value: entityTypes_1.EmployeeClassification.GeneralManager,
        label: entityTypes_1.EmployeeClassificationLabel.GeneralManager
    });
    return employeeTypes;
};
const buildEmptyEmployee = () => {
    return {
        id: "",
        lastName: "",
        active: false,
        firstName: "",
        employeeId: "",
        classification: entityTypes_1.EmployeeClassification.NotDefined,
        managerId: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPTY_UUID)
    };
};
const processStartEmployeeDetailError = (error, res) => {
    if (Helper.processStartError(error, res)) {
        return;
    }
    res.status((error.status || 500))
        .render(routingLookup_1.ViewNameLookup.EmployeeDetail, {
        isInitialEmployee: false,
        employee: buildEmptyEmployee(),
        employeeTypes: buildEmployeeTypes(),
        errorMessage: (error.message
            || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_UNABLE_TO_QUERY))
    });
};
const determineCanCreateEmployee = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let employeeExists;
    return EmployeeExistsQuery.query()
        .then((employeeExistsCommandResponse) => {
        employeeExists = ((employeeExistsCommandResponse.data != null)
            && employeeExistsCommandResponse.data);
        if (!employeeExists) {
            return Promise.resolve({ status: 200 });
        }
        return ValidateActiveUser.execute(req.session.id);
    }).then((activeUserCommandResponse) => {
        return {
            employeeExists: employeeExists,
            isElevatedUser: ((activeUserCommandResponse.data != null)
                && EmployeeHelper.isElevatedUser(activeUserCommandResponse.data.classification))
        };
    });
});
exports.start = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.handleInvalidSession(req, res)) {
        return;
    }
    return determineCanCreateEmployee(req)
        .then((canCreateEmployee) => {
        if (canCreateEmployee.employeeExists
            && !canCreateEmployee.isElevatedUser) {
            return res.redirect(Helper.buildNoPermissionsRedirectUrl());
        }
        return res.render(routingLookup_1.ViewNameLookup.EmployeeDetail, {
            employee: buildEmptyEmployee(),
            employeeTypes: buildEmployeeTypes(),
            isInitialEmployee: !canCreateEmployee.employeeExists,
            errorMessage: resourceLookup_1.Resources.getString(req.query[routingLookup_1.QueryParameterLookup.ErrorCode])
        });
    }).catch((error) => {
        return processStartEmployeeDetailError(error, res);
    });
});
exports.startWithEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.handleInvalidSession(req, res)) {
        return;
    }
    return ValidateActiveUser.execute(req.session.id)
        .then((activeUserCommandResponse) => {
        if (!EmployeeHelper.isElevatedUser(activeUserCommandResponse.data.classification)) {
            return Promise.reject({
                status: 403,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NO_PERMISSIONS)
            });
        }
        return EmployeeQuery.queryById(req.params[routingLookup_1.ParameterLookup.EmployeeId]);
    }).then((employeeCommandResponse) => {
        return res.render(routingLookup_1.ViewNameLookup.EmployeeDetail, {
            isInitialEmployee: false,
            employeeTypes: buildEmployeeTypes(),
            employee: employeeCommandResponse.data,
            errorMessage: resourceLookup_1.Resources.getString(req.query[routingLookup_1.QueryParameterLookup.ErrorCode])
        });
    }).catch((error) => {
        return processStartEmployeeDetailError(error, res);
    });
});
const saveEmployee = (req, res, performSave) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.handleInvalidApiSession(req, res)) {
        return;
    }
    let employeeExists;
    return determineCanCreateEmployee(req)
        .then((canCreateEmployee) => {
        if (canCreateEmployee.employeeExists
            && !canCreateEmployee.isElevatedUser) {
            return Promise.reject({
                status: 403,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NO_PERMISSIONS)
            });
        }
        employeeExists = canCreateEmployee.employeeExists;
        return performSave(req.body, !employeeExists);
    }).then((saveEmployeeCommandResponse) => {
        const response = {
            employee: saveEmployeeCommandResponse.data
        };
        if (!employeeExists) {
            response.redirectUrl = (routingLookup_1.RouteLookup.SignIn
                + "?" + routingLookup_1.QueryParameterLookup.EmployeeId
                + "=" + saveEmployeeCommandResponse.data.employeeId);
        }
        res.status(saveEmployeeCommandResponse.status)
            .send(response);
    }).catch((error) => {
        return Helper.processApiError(error, res, {
            defaultErrorMessage: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_UNABLE_TO_SAVE)
        });
    });
});
exports.updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return saveEmployee(req, res, EmployeeUpdateCommand.execute);
});
exports.createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return saveEmployee(req, res, EmployeeCreateCommand.execute);
});
//# sourceMappingURL=employeeDetailRouteController.js.map