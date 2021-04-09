import { EmployeeModel } from "../models/employeeModel";
import { CommandResponse } from "../../typeDefinitions";
import * as EmployeeRepository from "../models/employeeModel";
import { Resources, ResourceKey } from "../../../resourceLookup";

export const query = async (): Promise<CommandResponse<boolean>> => {
	//Query if employee is in db by ID
	return EmployeeRepository.queryActiveExists()
		.then((queriedEmployee: (EmployeeModel | null)): CommandResponse<boolean> => {
			if (!queriedEmployee) {
				return <CommandResponse<boolean>>{
					//Return 404 if employee is not found in database					
					status: 404,
					message: Resources.getString(ResourceKey.EMPLOYEE_NOT_FOUND)
				};
			}

			return <CommandResponse<boolean>>{
				data: true,
				status: 200
			};
		});
};
