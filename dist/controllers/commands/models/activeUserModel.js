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
class ActiveUserModel extends sequelize_2.Model {
}
exports.ActiveUserModel = ActiveUserModel;
ActiveUserModel.init({
    id: {
        field: databaseNames_1.ActiveUserFieldName.ID,
        type: sequelize_1.default.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        field: databaseNames_1.ActiveUserFieldName.Name,
        type: new sequelize_2.DataTypes.STRING(256),
        allowNull: true
    },
    createdOn: {
        field: databaseNames_1.ActiveUserFieldName.CreatedOn,
        type: new sequelize_2.DataTypes.DATE(),
        allowNull: true
    },
    employeeId: {
        field: databaseNames_1.ActiveUserFieldName.EmployeeId,
        type: sequelize_1.default.UUID,
        allowNull: true
    },
    sessionKey: {
        field: databaseNames_1.ActiveUserFieldName.SessionKey,
        type: new sequelize_2.DataTypes.STRING(128),
        allowNull: true
    },
    classification: {
        field: databaseNames_1.ActiveUserFieldName.Classification,
        type: sequelize_1.default.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize: databaseConnection_1.DatabaseConnection,
    tableName: databaseNames_1.DatabaseTableName.ACTIVE_USER
});
exports.queryById = (id, queryTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    return ActiveUserModel.findOne({
        transaction: queryTransaction,
        where: { id: id }
    });
});
exports.queryBySessionKey = (sessionKey, queryTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    return ActiveUserModel.findOne({
        transaction: queryTransaction,
        where: { sessionKey: sessionKey }
    });
});
exports.queryByEmployeeId = (employeeId, queryTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    return ActiveUserModel.findOne({
        transaction: queryTransaction,
        where: { employeeId: employeeId }
    });
});
//# sourceMappingURL=activeUserModel.js.map