import * as path from "path";
import * as fileSystem from "fs";

let stringMapping: { [key: string]: string } = {};
const stringResourceFilePath: string = "../public/resources/strings/en-US/strings.json";

export const Resources = {
	loadStrings: (): void => {
		const fileContents: Buffer =
			fileSystem.readFileSync(
				path.join(__dirname, stringResourceFilePath));

		stringMapping = JSON.parse(fileContents.toString());
	},
	getString: (key?: string): string => {
		if ((key == null) || (stringMapping[key] == null)) {
			return "";
		}

		return stringMapping[key];
	}
};

export enum ResourceKey {
	// Database
	// Database - product
	/** Product was not found. */
	PRODUCT_NOT_FOUND = "0010001",
	/** Unable to save product. */
	PRODUCT_UNABLE_TO_SAVE = "0010002",
	/** Unable to delete product. */
	PRODUCT_UNABLE_TO_DELETE = "0010003",
	/** Unable to retrieve product listing. */
	PRODUCTS_UNABLE_TO_QUERY = "0010004",
	// End database - product

	// Database - employee
	/** Employee was not found. */
	EMPLOYEE_NOT_FOUND = "0010201",
	/** Unable to save employee. */
	EMPLOYEE_UNABLE_TO_SAVE = "0010202",
	/** Unable to delete employee. */
	EMPLOYEE_UNABLE_TO_DELETE = "0010203",
	/** Unable to retrieve employee details. */
	EMPLOYEE_UNABLE_TO_QUERY = "0010204",
	/** Unable to retrieve employee listing. */
	EMPLOYEES_UNABLE_TO_QUERY = "0010205",
	// End database - employee
	// End database

	// General
	// General - active user
	/** An active session was not found. */
	USER_SESSION_NOT_FOUND = "0100001",
	/** An active user record was not found for the provided session details. Please sign in again. */
	USER_NOT_FOUND = "0100002",
	/** The current user's session is no longer active. */
	USER_SESSION_NOT_ACTIVE = "0100003",
	/** Unable to sign in user. */
	USER_UNABLE_TO_SIGN_IN = "0100004",
	/** Sign in credentials are invalid. */
	USER_SIGN_IN_CREDENTIALS_INVALID = "0100005",
	/** Unable to sign out user. */
	USER_UNABLE_TO_SIGN_OUT = "0100006",
	/** You do not have permission to perform this action. */
	USER_NO_PERMISSIONS = "0100007",
	// End general - active user

	// General - product
	/** The provided product record ID is not valid. */
	PRODUCT_RECORD_ID_INVALID = "0102001",
	/** Please provide a valid product lookup code. */
	PRODUCT_LOOKUP_CODE_INVALID = "0102002",
	/** Please provide a valid product count. */
	PRODUCT_COUNT_INVALID = "0102003",
	/** Product count may must be greater than or equal to zero. */
	PRODUCT_COUNT_NON_NEGATIVE = "0102004",
	/** Conflict on parameter: lookupcode. */
	PRODUCT_LOOKUP_CODE_CONFLICT = "0102005",
	// End general - product

	// General - employee
	/** The provided employee record ID is not valid. */
	EMPLOYEE_RECORD_ID_INVALID = "0104001",
	/** Please provide a valid first name. */
	EMPLOYEE_FIRST_NAME_INVALID = "0104002",
	/** Please provide a valid last name. */
	EMPLOYEE_LAST_NAME_INVALID = "0104003",
	/** Please provide a valid password. */
	EMPLOYEE_PASSWORD_INVALID = "0104004",
	/** Please provide a valid employee type. */
	EMPLOYEE_TYPE_INVALID = "0104005",
	/** Please provide a valid manager ID. */
	EMPLOYEE_MANAGER_ID_INVALID = "0104006",
	/** Please provide a valid employee ID. */
	EMPLOYEE_EMPLOYEE_ID_INVALID = "0104007",
	// End general - employee
	// End general

	// Constants
	/** 00000000-0000-0000-0000-000000000000 */
	EMPTY_UUID = "0202001"
	// End constants
}
