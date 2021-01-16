import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { ProductModel } from "../models/productModel";
import { CommandResponse } from "../../typeDefinitions";
import * as ProductRepository from "../models/productModel";
import { Resources, ResourceKey } from "../../../resourceLookup";
import * as DatabaseConnection from "../models/databaseConnection";

export const execute = async (productId?: string): Promise<CommandResponse<void>> => {
	if (Helper.isBlankString(productId)) {
		return <CommandResponse<void>>{ status: 204 };
	}

	let deleteTransaction: Sequelize.Transaction;

	return DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction): Promise<ProductModel | null> => {
			deleteTransaction = createdTransaction;

			return ProductRepository.queryById(
				<string>productId,
				deleteTransaction);
		}).then((queriedProduct: (ProductModel | null)): Promise<void> => {
			if (queriedProduct == null) {
				return Promise.resolve();
			}

			return queriedProduct.destroy(
				<Sequelize.InstanceDestroyOptions>{
					transaction: deleteTransaction
				});
		}).then((): CommandResponse<void> => {
			deleteTransaction.commit();

			return <CommandResponse<void>>{ status: 204 };
		}).catch((error: any): Promise<CommandResponse<void>> => {
			if (deleteTransaction != null) {
				deleteTransaction.rollback();
			}

			return Promise.reject(<CommandResponse<void>>{
				status: (error.status || 500),
				message: (error.message
					|| Resources.getString(ResourceKey.PRODUCT_UNABLE_TO_DELETE))
			});
		});
};
