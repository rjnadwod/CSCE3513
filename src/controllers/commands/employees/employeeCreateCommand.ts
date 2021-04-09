import * as Helper from "../helpers/helper";
import { EmployeeModel } from "../models/employeeModel";
import * as EmployeeHelper from "./helpers/employeeHelper";
import { Resources, ResourceKey } from "../../../resourceLookup";
import { EmployeeClassification } from "../models/constants/entityTypes";
import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";


//Save Request Validation
const validateSaveRequest = (
	employeeSaveRequest: EmployeeSaveRequest,
	isInitialEmployee: boolean = false
): CommandResponse<Employee> => {

	let errorMessage: string = "";
	//Check if fields are left blanks
	if (Helper.isBlankString(employeeSaveRequest.firstName)) {
		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_FIRST_NAME_INVALID);
	} else if (Helper.isBlankString(employeeSaveRequest.lastName)) {
		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_LAST_NAME_INVALID);
	} else if (Helper.isBlankString(employeeSaveRequest.password)) {
		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_PASSWORD_INVALID);
	} //Defaulting Classification to general manager
	  else if (!isInitialEmployee
		&& ((employeeSaveRequest.classification == null)
			|| isNaN(employeeSaveRequest.classification)
			|| !(employeeSaveRequest.classification in EmployeeClassification))) {

		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_TYPE_INVALID);
	} else if (!Helper.isBlankString(employeeSaveRequest.managerId)
		&& !Helper.isValidUUID(<string>employeeSaveRequest.managerId)) {

		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_MANAGER_ID_INVALID);
	}

	return ((errorMessage === "")
		? <CommandResponse<Employee>>{ status: 200 }
		: <CommandResponse<Employee>>{
			status: 422,
			message: errorMessage
		});
};

export const execute = async (
	employeeSaveRequest: EmployeeSaveRequest,
	isInitialEmployee: boolean = false
): Promise<CommandResponse<Employee>> => {

	const validationResponse: CommandResponse<Employee> =
		validateSaveRequest(employeeSaveRequest, isInitialEmployee);
	if (validationResponse.status !== 200) {
		return Promise.reject(validationResponse);
	}

	const employeeToCreate: EmployeeModel = <EmployeeModel>{
		active: true,
		lastName: employeeSaveRequest.lastName,
		firstName: employeeSaveRequest.firstName,
		managerId: employeeSaveRequest.managerId,
		classification: (!isInitialEmployee
			? <EmployeeClassification>employeeSaveRequest.classification
			: EmployeeClassification.GeneralManager),
		password: Buffer.from(
			EmployeeHelper.hashString(employeeSaveRequest.password))
	};

	return EmployeeModel.create(employeeToCreate)
		.then((createdEmployee: EmployeeModel): CommandResponse<Employee> => {
			return <CommandResponse<Employee>>{
				status: 201,
				data: EmployeeHelper.mapEmployeeData(createdEmployee)
			};
		});
};
