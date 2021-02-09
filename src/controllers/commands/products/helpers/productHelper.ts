import * as Helper from "../../helpers/helper";
import { Product } from "../../../typeDefinitions";
import { ProductModel } from "../../models/productModel";

export const mapProductData = (queriedProduct: ProductModel): Product => {
	return <Product>{
		id: queriedProduct.id,
		count: queriedProduct.count,
		lookupCode: queriedProduct.lookupCode,
		createdOn: Helper.formatDate(queriedProduct.createdOn)
	};
};
