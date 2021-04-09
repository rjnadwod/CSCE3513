import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as EmployeeDetailRouteController from "../controllers/employeeDetailRouteController";

function employeeDetailRoutes(server: express.Express) {
	// getting employee details (PS)
	server.get(
		RouteLookup.EmployeeDetail,
		EmployeeDetailRouteController.start);
	server.get(
		(RouteLookup.EmployeeDetail + RouteLookup.EmployeeIdParameter),
		EmployeeDetailRouteController.startWithEmployee);
	// performing a patch request if employee exists in database (PS)
	server.patch(
		(RouteLookup.API + RouteLookup.EmployeeDetail
			+ RouteLookup.EmployeeIdParameter),
		EmployeeDetailRouteController.updateEmployee);	// updating the employee if already exists (PS)
	// performing a post request if the employee is new
	server.post(
		(RouteLookup.API + RouteLookup.EmployeeDetail),
		EmployeeDetailRouteController.createEmployee);	// creating employee if new (PS)
}

module.exports.routes = employeeDetailRoutes;
