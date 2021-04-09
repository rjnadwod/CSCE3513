import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as EmployeeDetailRouteController from "../controllers/employeeDetailRouteController";

function employeeDetailRoutes(server: express.Express) {
	// getting the employee details (PS)
	server.get(
		RouteLookup.EmployeeDetail,
		EmployeeDetailRouteController.start);
	server.get(
		(RouteLookup.EmployeeDetail + RouteLookup.EmployeeIdParameter),
		EmployeeDetailRouteController.startWithEmployee);
	// performing patch request if employee exists in database (PS)
	server.patch(
		(RouteLookup.API + RouteLookup.EmployeeDetail   //PAYTON - look over (MA) thnx
			+ RouteLookup.EmployeeIdParameter),
		EmployeeDetailRouteController.updateEmployee);
	// performing post request if employee is new (PS)
	server.post(
		(RouteLookup.API + RouteLookup.EmployeeDetail),
		EmployeeDetailRouteController.createEmployee);
}

module.exports.routes = employeeDetailRoutes;
