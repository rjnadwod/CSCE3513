"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routingLookup_1 = require("../controllers/lookups/routingLookup");
const EmployeeDetailRouteController = __importStar(require("../controllers/employeeDetailRouteController"));
function employeeDetailRoutes(server) {
    server.get(routingLookup_1.RouteLookup.EmployeeDetail, EmployeeDetailRouteController.start);
    server.get((routingLookup_1.RouteLookup.EmployeeDetail + routingLookup_1.RouteLookup.EmployeeIdParameter), EmployeeDetailRouteController.startWithEmployee);
    server.patch((routingLookup_1.RouteLookup.API + routingLookup_1.RouteLookup.EmployeeDetail
        + routingLookup_1.RouteLookup.EmployeeIdParameter), EmployeeDetailRouteController.updateEmployee);
    server.post((routingLookup_1.RouteLookup.API + routingLookup_1.RouteLookup.EmployeeDetail), EmployeeDetailRouteController.createEmployee);
}
module.exports.routes = employeeDetailRoutes;
//# sourceMappingURL=employeeDetailRoutes.js.map