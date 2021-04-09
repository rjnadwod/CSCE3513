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
const activeUserModel_1 = require("../models/activeUserModel");
const EmployeeRepository = __importStar(require("../models/employeeModel"));
const resourceLookup_1 = require("../../../resourceLookup");
const ActiveUserRepository = __importStar(require("../models/activeUserModel"));
const DatabaseConnection = __importStar(require("../models/databaseConnection"));
const validateSaveRequest = (signInRequest) => {
    if (Helper.isBlankString(signInRequest.employeeId)
        || isNaN(Number(signInRequest.employeeId))
        || Helper.isBlankString(signInRequest.password)) {
        return {
            status: 422,
            message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_SIGN_IN_CREDENTIALS_INVALID)
        };
    }
    return { status: 200 };
};
const upsertActiveUser = (activeUser) => __awaiter(void 0, void 0, void 0, function* () {
    let upsertTransaction;
    return DatabaseConnection.createTransaction()
        .then((createdTransaction) => {
        upsertTransaction = createdTransaction;
        return ActiveUserRepository.queryByEmployeeId(activeUser.employeeId, upsertTransaction);
    }).then((queriedActiveUser) => {
        if (queriedActiveUser) {
            return queriedActiveUser.update({ sessionKey: activeUser.sessionKey }, {
                transaction: upsertTransaction
            });
        }
        else {
            return activeUserModel_1.ActiveUserModel.create(activeUser, {
                transaction: upsertTransaction
            });
        }
    }).then((activeUser) => {
        upsertTransaction.commit();
        return {
            status: 200,
            data: activeUser
        };
    }).catch((error) => {
        upsertTransaction.rollback();
        return Promise.reject({
            status: 500,
            message: error.message
        });
    });
});
exports.execute = (signInRequest, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (session == null) {
        return Promise.reject({
            status: 500,
            message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_SESSION_NOT_FOUND)
        });
    }
    const validationResponse = validateSaveRequest(signInRequest);
    if (validationResponse.status !== 200) {
        return Promise.reject(validationResponse);
    }
    return EmployeeRepository.queryByEmployeeId(Number(signInRequest.employeeId))
        .then((queriedEmployee) => {
        if ((queriedEmployee == null) ||
            (EmployeeHelper.hashString(signInRequest.password) !== queriedEmployee.password.toString())) {
            return Promise.reject({
                status: 401,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_SIGN_IN_CREDENTIALS_INVALID)
            });
        }
        return upsertActiveUser({
            employeeId: queriedEmployee.id,
            sessionKey: session.id,
            classification: queriedEmployee.classification,
            name: (queriedEmployee.firstName + " " + queriedEmployee.lastName)
        });
    }).then((activeUserCommandResponse) => {
        return {
            status: 200,
            data: {
                id: activeUserCommandResponse.data.id,
                name: activeUserCommandResponse.data.name,
                employeeId: activeUserCommandResponse.data.employeeId,
                classification: activeUserCommandResponse.data.classification
            }
        };
    });
});
//# sourceMappingURL=employeeSignInCommand.js.map