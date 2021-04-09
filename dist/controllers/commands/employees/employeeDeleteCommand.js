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
const EmployeeRepository = __importStar(require("../models/employeeModel"));
const resourceLookup_1 = require("../../../resourceLookup");
const DatabaseConnection = __importStar(require("../models/databaseConnection"));
exports.execute = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.isBlankString(employeeId)) {
        return Promise.resolve({ status: 204 });
    }
    let deleteTransaction;
    return DatabaseConnection.createTransaction()
        .then((createdTransaction) => {
        deleteTransaction = createdTransaction;
        return EmployeeRepository.queryById(employeeId, deleteTransaction);
    }).then((queriedEmployee) => {
        if (queriedEmployee == null) {
            return Promise.resolve();
        }
        return queriedEmployee.destroy({
            transaction: deleteTransaction
        });
    }).then(() => {
        deleteTransaction.commit();
        return { status: 204 };
    }).catch((error) => {
        if (deleteTransaction != null) {
            deleteTransaction.rollback();
        }
        return Promise.reject({
            status: (error.status || 500),
            message: (error.message
                || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEE_UNABLE_TO_DELETE))
        });
    });
});
//# sourceMappingURL=employeeDeleteCommand.js.map