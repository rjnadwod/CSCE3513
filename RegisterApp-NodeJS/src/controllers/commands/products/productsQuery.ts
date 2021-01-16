import { ProductModel } from "../models/productModel";
import * as ProductHelper from "./helpers/productHelper";
import * as ProductRepository from "../models/productModel";
import { CommandResponse, Product } from "../../typeDefinitions";

export const query = async (): Promise<CommandResponse<Product[]>> => {
	return ProductRepository.queryAll()
		.then((queriedProducts: ProductModel[]): CommandResponse<Product[]> => {
			return <CommandResponse<Product[]>>{
				status: 200,
				data: queriedProducts.map<Product>((queriedProduct: ProductModel) => {
					return ProductHelper.mapProductData(queriedProduct);
				})
			};
		});
};
