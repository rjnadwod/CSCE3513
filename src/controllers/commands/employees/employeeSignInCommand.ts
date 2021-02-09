import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { EmployeeModel } from "../models/employeeModel";
import * as EmployeeHelper from "./helpers/employeeHelper";
import { ActiveUserModel } from "../models/activeUserModel";
import * as EmployeeRepository from "../models/employeeModel";
import { Resources, ResourceKey } from "../../../resourceLookup";
import * as ActiveUserRepository from "../models/activeUserModel";
import * as DatabaseConnection from "../models/databaseConnection";
import { CommandResponse, SignInRequest, ActiveUser } from "../../typeDefinitions";

const validateSaveRequest = (signInRequest: SignInRequest): CommandResponse<ActiveUser> => {
	if (Helper.isBlankString(signInRequest.employeeId)
		|| isNaN(Number(signInRequest.employeeId))
		|| Helper.isBlankString(signInRequest.password)) {

		return <CommandResponse<ActiveUser>>{
			status: 422,
			message: Resources.getString(ResourceKey.USER_SIGN_IN_CREDENTIALS_INVALID)
		};
	}

	return <CommandResponse<ActiveUser>>{ status: 200 };
};

const upsertActiveUser = async (
	activeUser: ActiveUserModel
): Promise<CommandResponse<ActiveUserModel>> => {

	let upsertTransaction: Sequelize.Transaction;

	return DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction): Promise<ActiveUserModel | null> => {
			upsertTransaction = createdTransaction;

			return ActiveUserRepository.queryByEmployeeId(
				activeUser.employeeId,
				upsertTransaction);
		}).then((queriedActiveUser: (ActiveUserModel | null)): Promise<ActiveUserModel> => {
			if (queriedActiveUser) {
				return queriedActiveUser.update(
					<Object>{ sessionKey: activeUser.sessionKey },
					<Sequelize.InstanceUpdateOptions>{
						transaction: upsertTransaction
					});
			} else {
				return ActiveUserModel.create(
					activeUser,
					<Sequelize.CreateOptions>{
						transaction: upsertTransaction
					});
			}
		}).then((activeUser: ActiveUserModel): CommandResponse<ActiveUserModel> => {
			upsertTransaction.commit();

			return <CommandResponse<ActiveUserModel>>{
				status: 200,
				data: activeUser
			};
		}).catch((error: any): Promise<CommandResponse<ActiveUserModel>> => {
			upsertTransaction.rollback();

			return Promise.reject(<CommandResponse<ActiveUserModel>>{
				status: 500,
				message: error.message
			});
		});
};

export const execute = async (
	signInRequest: SignInRequest,
	session?: Express.Session
): Promise<CommandResponse<ActiveUser>> => {

	if (session == null) {
		return Promise.reject(<CommandResponse<ActiveUser>>{
			status: 500,
			message: Resources.getString(ResourceKey.USER_SESSION_NOT_FOUND)
		});
	}

	const validationResponse: CommandResponse<ActiveUser> =
		validateSaveRequest(signInRequest);
	if (validationResponse.status !== 200) {
		return Promise.reject(validationResponse);
	}

	return EmployeeRepository.queryByEmployeeId(Number(signInRequest.employeeId))
		.then((queriedEmployee: (EmployeeModel | null)): Promise<CommandResponse<ActiveUserModel>> => {
			if ((queriedEmployee == null) ||
				(EmployeeHelper.hashString(signInRequest.password) !== queriedEmployee.password.toString())) {

				return Promise.reject(<CommandResponse<ActiveUser>>{
					status: 401,
					message: Resources.getString(ResourceKey.USER_SIGN_IN_CREDENTIALS_INVALID)
				});
			}

			return upsertActiveUser(<ActiveUserModel>{
				employeeId: queriedEmployee.id,
				sessionKey: (<Express.Session>session).id,
				classification: queriedEmployee.classification,
				name: (queriedEmployee.firstName + " " + queriedEmployee.lastName)
			});
		}).then((activeUserCommandResponse: CommandResponse<ActiveUserModel>): CommandResponse<ActiveUser> => {
			return <CommandResponse<ActiveUser>>{
				status: 200,
				data: <ActiveUser>{
					id: (<ActiveUserModel>activeUserCommandResponse.data).id,
					name: (<ActiveUserModel>activeUserCommandResponse.data).name,
					employeeId: (<ActiveUserModel>activeUserCommandResponse.data).employeeId,
					classification: (<ActiveUserModel>activeUserCommandResponse.data).classification
				}
			};
		});
};
