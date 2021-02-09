import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ProductModel } from "../models/productModel";
import * as ProductRepository from "../models/productModel";
import { Resources, ResourceKey } from "../../../resourceLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import { CommandResponse, Product, ProductSaveRequest } from "../../typeDefinitions";

const validateSaveRequest = (
	saveProductRequest: ProductSaveRequest
): CommandResponse<Product> => {

	let errorMessage: string = "";

	if (Helper.isBlankString(saveProductRequest.lookupCode)) {
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

	const productToCreate: ProductModel = <ProductModel>{
		count: saveProductRequest.count,
		lookupCode: saveProductRequest.lookupCode
	};

	let createTransaction: Sequelize.Transaction;

	return DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction): Promise<ProductModel | null> => {
			createTransaction = createdTransaction;

			return ProductRepository.queryByLookupCode(
				saveProductRequest.lookupCode,
				createTransaction);
		}).then((queriedProduct: (ProductModel | null)): Promise<ProductModel> => {
			if (queriedProduct != null) {
				return Promise.reject(<CommandResponse<Product>>{
					status: 409,
					message: Resources.getString(ResourceKey.PRODUCT_LOOKUP_CODE_CONFLICT)
				});
			}

			return ProductModel.create(
				productToCreate,
				<Sequelize.CreateOptions>{
					transaction: createTransaction
				});
		}).then((createdProduct: ProductModel): CommandResponse<Product> => {
			createTransaction.commit();

			return <CommandResponse<Product>>{
				status: 201,
				data: <Product>{
					id: createdProduct.id,
					count: createdProduct.count,
					lookupCode: createdProduct.lookupCode,
					createdOn: Helper.formatDate(createdProduct.createdOn)
				}
			};
		}).catch((error: any): Promise<CommandResponse<Product>> => {
			if (createTransaction != null) {
				createTransaction.rollback();
			}

			return Promise.reject(<CommandResponse<Product>>{
				status: (error.status || 500),
				message: (error.message
					|| Resources.getString(ResourceKey.PRODUCT_UNABLE_TO_SAVE))
			});
		});
};
