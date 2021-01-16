import * as Helper from "../helpers/helper";
import { ProductModel } from "../models/productModel";
import * as ProductHelper from "./helpers/productHelper";
import * as ProductRepository from "../models/productModel";
import { Resources, ResourceKey } from "../../../resourceLookup";
import { CommandResponse, Product } from "../../typeDefinitions";

export const queryById = async (productId?: string): Promise<CommandResponse<Product>> => {
	if (Helper.isBlankString(productId)) {
		return Promise.reject(<CommandResponse<Product>>{
			status: 422,
			message: Resources.getString(ResourceKey.PRODUCT_RECORD_ID_INVALID)
		});
	}

	return ProductRepository.queryById(<string>productId)
		.then((queriedProduct: (ProductModel | null)): Promise<CommandResponse<Product>> => {
			if (queriedProduct == null) {
				return Promise.reject(<CommandResponse<Product>>{
					status: 404,
					message: Resources.getString(ResourceKey.PRODUCT_NOT_FOUND)
				});
			}

			return Promise.resolve(<CommandResponse<Product>>{
				status: 200,
				data: ProductHelper.mapProductData(queriedProduct)
			});
		});
};

export const queryByLookupCode = async (
	productLookupCode?: string
): Promise<CommandResponse<Product>> => {

	if (Helper.isBlankString(productLookupCode)) {
		return Promise.reject(<CommandResponse<Product>>{
			status: 422,
			message: Resources.getString(ResourceKey.PRODUCT_LOOKUP_CODE_INVALID)
		});
	}

	return ProductRepository.queryByLookupCode(<string>productLookupCode)
		.then((queriedProduct: (ProductModel | null)): Promise<CommandResponse<Product>> => {
			if (queriedProduct == null) {
				return Promise.reject(<CommandResponse<Product>>{
					status: 404,
					message: Resources.getString(ResourceKey.PRODUCT_NOT_FOUND)
				});
			}

			return Promise.resolve(<CommandResponse<Product>>{
				status: 200,
				data: ProductHelper.mapProductData(queriedProduct)
			});
		});
};
