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
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConnection_1 = require("./databaseConnection");
const databaseNames_1 = require("./constants/databaseNames");
const sequelize_1 = require("sequelize");
class ProductModel extends sequelize_1.Model {
}
exports.ProductModel = ProductModel;
ProductModel.init({
    id: {
        field: databaseNames_1.ProductFieldName.ID,
        type: sequelize_1.DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    count: {
        field: databaseNames_1.ProductFieldName.COUNT,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    createdOn: {
        field: databaseNames_1.ProductFieldName.CREATED_ON,
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: true
    },
    lookupCode: {
        field: databaseNames_1.ProductFieldName.LOOKUP_CODE,
        type: new sequelize_1.DataTypes.STRING(32),
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize: databaseConnection_1.DatabaseConnection,
    tableName: databaseNames_1.DatabaseTableName.PRODUCT
});
exports.queryById = (id, queryTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    return ProductModel.findOne({
        transaction: queryTransaction,
        where: { id: id }
    });
});
exports.queryByLookupCode = (lookupCode, queryTransaction) => __awaiter(void 0, void 0, void 0, function* () {
    return ProductModel.findOne({
        transaction: queryTransaction,
        where: { lookupCode: lookupCode }
    });
});
exports.queryAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return ProductModel.findAll({
        order: [[databaseNames_1.ProductFieldName.CREATED_ON, "ASC"]]
    });
});
//# sourceMappingURL=productModel.js.map