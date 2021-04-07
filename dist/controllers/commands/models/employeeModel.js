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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const databaseConnection_1 = require("./databaseConnection");
const databaseNames_1 = require("./constants/databaseNames");
const sequelize_2 = require("sequelize");
class EmployeeModel extends sequelize_2.Model {
}
exports.EmployeeModel = EmployeeModel;
EmployeeModel.init({
    id: {
        field: databaseNames_1.EmployeeFieldName.ID,
        type: sequelize_1.default.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    active: {
        field: databaseNames_1.EmployeeFieldName.Active,
        type: sequelize_1.default.BOOLEAN,
        allowNull: true
    },
    lastName: {
        field: databaseNames_1.EmployeeFieldName.LastName,
        type: new sequelize_2.DataTypes.STRING(128),
        allowNull: true
    },
    password: {
        field: databaseNames_1.EmployeeFieldName.Password,
        type: sequelize_1.default.BLOB,
        allowNull: true
    },
    createdOn: {
        field: databaseNames_1.EmployeeFieldName.CreatedOn,
        type: new sequelize_2.DataTypes.DATE(),
        allowNull: true
    },
    firstName: {
        field: databaseNames_1.EmployeeFieldName.FirstName,
        type: new sequelize_2.DataTypes.STRING(128),
        allowNull: true
    },
    managerId: {
        field: databaseNames_1.EmployeeFieldName.ManagerId,
        type: sequelize_1.default.UUID,
        allowNull: true
    },
    employeeId: {
        field: databaseNames_1.EmployeeFieldName.EmployeeId,
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    classification: {
        field: databaseNames_1.EmployeeFieldName.Classification,
        type: sequelize_1.default.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize: databaseConnection_1.DatabaseConnection,
    tableName: databaseNames_1.DatabaseTableName.EMPLOYEE
});
exports.queryById = (id, queryTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    return EmployeeModel.findOne({
        transaction: queryTransaction,
        where: { id: id }
    });
});
exports.queryByEmployeeId = (employeeId, queryTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    return EmployeeModel.findOne({
        transaction: queryTransaction,
        where: { employeeId: employeeId }
    });
});
exports.queryActive = () => __awaiter(void 0, void 0, void 0, function* () {
    return EmployeeModel.findAll({
        order: [[databaseNames_1.EmployeeFieldName.CreatedOn, "ASC"]],
        where: { active: true }
    });
});
exports.queryActiveExists = () => __awaiter(void 0, void 0, void 0, function* () {
    return EmployeeModel.findOne({
        where: { active: true }
    });
});
//# sourceMappingURL=employeeModel.js.map