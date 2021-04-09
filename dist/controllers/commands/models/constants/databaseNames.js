"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseTableName;
(function (DatabaseTableName) {
    DatabaseTableName["PRODUCT"] = "product";
    DatabaseTableName["EMPLOYEE"] = "employee";
    DatabaseTableName["ACTIVE_USER"] = "activeuser";
})(DatabaseTableName = exports.DatabaseTableName || (exports.DatabaseTableName = {}));
var ProductFieldName;
(function (ProductFieldName) {
    ProductFieldName["ID"] = "id";
    ProductFieldName["COUNT"] = "count";
    ProductFieldName["CREATED_ON"] = "createdon";
    ProductFieldName["LOOKUP_CODE"] = "lookupcode";
})(ProductFieldName = exports.ProductFieldName || (exports.ProductFieldName = {}));
var EmployeeFieldName;
(function (EmployeeFieldName) {
    EmployeeFieldName["ID"] = "id";
    EmployeeFieldName["Active"] = "active";
    EmployeeFieldName["Password"] = "password";
    EmployeeFieldName["LastName"] = "lastname";
    EmployeeFieldName["CreatedOn"] = "createdon";
    EmployeeFieldName["FirstName"] = "firstname";
    EmployeeFieldName["ManagerId"] = "managerid";
    EmployeeFieldName["EmployeeId"] = "employeeid";
    EmployeeFieldName["Classification"] = "classification";
})(EmployeeFieldName = exports.EmployeeFieldName || (exports.EmployeeFieldName = {}));
var ActiveUserFieldName;
(function (ActiveUserFieldName) {
    ActiveUserFieldName["ID"] = "id";
    ActiveUserFieldName["Name"] = "name";
    ActiveUserFieldName["CreatedOn"] = "createdon";
    ActiveUserFieldName["EmployeeId"] = "employeeid";
    ActiveUserFieldName["SessionKey"] = "sessionkey";
    ActiveUserFieldName["Classification"] = "classification";
})(ActiveUserFieldName = exports.ActiveUserFieldName || (exports.ActiveUserFieldName = {}));
//# sourceMappingURL=databaseNames.js.map