import * as crypto from "crypto";
import { Employee } from "../../../typeDefinitions";
import { EmployeeModel } from "../../models/employeeModel";
import { EmployeeClassification } from "../../models/constants/entityTypes";

const employeeIdBase: string = "00000";

export const hashString = (toHash: string): string => {
	const hash = crypto.createHash("sha256");
	hash.update(toHash);
	return hash.digest("hex");
};

export const padEmployeeId = (employeeId: number): string => {
	const employeeIdAsString: string = employeeId.toString();

	return (employeeIdBase + employeeIdAsString)
		.slice(-Math.max(employeeIdBase.length, employeeIdAsString.length));
};

export const mapEmployeeData = (queriedEmployee: EmployeeModel): Employee => {
	return <Employee>{
		id: queriedEmployee.id,
		active: queriedEmployee.active,
		lastName: queriedEmployee.lastName,
		createdOn: queriedEmployee.createdOn,
		firstName: queriedEmployee.firstName,
		managerId: queriedEmployee.managerId,
		employeeId: padEmployeeId(queriedEmployee.employeeId),
		classification: <EmployeeClassification>queriedEmployee.classification
	};
};

export const isElevatedUser = (employeeClassification: EmployeeClassification): boolean => {
	return ((employeeClassification === EmployeeClassification.GeneralManager)
		|| (employeeClassification === EmployeeClassification.ShiftManager));
};
