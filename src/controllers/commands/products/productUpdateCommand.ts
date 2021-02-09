import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ProductModel } from "../models/productModel";
import * as ProductHelper from "./helpers/productHelper";
import * as ProductRepository from "../models/productModel";
import { Resources, ResourceKey } from "../../../resourceLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import { CommandResponse, Product, ProductSaveRequest } from "../../typeDefinitions";

const validateSaveRequest = (saveProductRequest: ProductSaveRequest): CommandResponse<Product> => {
	let errorMessage: string = "";

	if (Helper.isBlankString(saveProductRequest.id)) {
		errorMessage = Resources.getString(ResourceKey.PRODUCT_RECORD_ID_INVALID);
	} else if (Helper.isBlankString(saveProductRequest.lookupCode)) {
		errorMessage = Resources.getString(ResourceKey.PRODUCT_LOOKUP_CODE_INVALID);
	} else if ((saveProductRequest.count == null)
		|| isNaN(saveProductRequest.count)) {

		errorMessage = Resources.getString(ResourceKey.PRODUCT_COUNT_INVALID);
	} else if (saveProductRequest.count < 0) {
		errorMessage = Resources.getString(ResourceKey.PRODUCT_COUNT_NON_NEGATIVE);
	}

	return ((errorMessage === "")
		? <CommandResponse<Product>>{ status: 200 }
		: <CommandResponse<Product>>{
			status: 422,
			message: errorMessage
		});
};

export const execute = async (
	saveProductRequest: ProductSaveRequest
): Promise<CommandResponse<Product>> => {

	const validationResponse: CommandResponse<Product> =
		validateSaveRequest(saveProductRequest);
	if (validationResponse.status !== 200) {
		return Promise.reject(validationResponse);
	}

	let updateTransaction: Sequelize.Transaction;

	return DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction): Promise<ProductModel | null> => {
			updateTransaction = createdTransaction;

			return ProductRepository.queryById(
				<string>saveProductRequest.id,
				updateTransaction);
		}).then((queriedProduct: (ProductModel | null)): Promise<ProductModel> => {
			if (queriedProduct == null) {
				return Promise.reject(<CommandResponse<Product>>{
					status: 404,
					message: Resources.getString(ResourceKey.PRODUCT_NOT_FOUND)
				});
			}

			return queriedProduct.update(
				<Object>{
					count: saveProductRequest.count,
					lookupCode: saveProductRequest.lookupCode
				},
				<Sequelize.InstanceUpdateOptions>{
					transaction: updateTransaction
				});
		}).then((updatedProduct: ProductModel): CommandResponse<Product> => {
			updateTransaction.commit();

			return <CommandResponse<Product>>{
				status: 200,
				data: ProductHelper.mapProductData(updatedProduct)
			};
		}).catch((error: any): Promise<CommandResponse<Product>> => {
			if (updateTransaction != null) {
				updateTransaction.rollback();
			}

			return Promise.reject(<CommandResponse<Product>>{
				status: (error.status || 500),
				message: (error.messsage
					|| Resources.getString(ResourceKey.PRODUCT_UNABLE_TO_SAVE))
			});
		});
};
