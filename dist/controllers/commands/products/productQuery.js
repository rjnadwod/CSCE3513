"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helper = __importStar(require("../helpers/helper"));
const ProductHelper = __importStar(require("./helpers/productHelper"));
const ProductRepository = __importStar(require("../models/productModel"));
const resourceLookup_1 = require("../../../resourceLookup");
exports.queryById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.isBlankString(productId)) {
        return Promise.reject({
            status: 422,
            message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_RECORD_ID_INVALID)
        });
    }
    return ProductRepository.queryById(productId)
        .then((queriedProduct) => {
        if (queriedProduct == null) {
            return Promise.reject({
                status: 404,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_NOT_FOUND)
            });
        }
        return Promise.resolve({
            status: 200,
            data: ProductHelper.mapProductData(queriedProduct)
        });
    });
});
exports.queryByLookupCode = (productLookupCode) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.isBlankString(productLookupCode)) {
        return Promise.reject({
            status: 422,
            message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_LOOKUP_CODE_INVALID)
        });
    }
    return ProductRepository.queryByLookupCode(productLookupCode)
        .then((queriedProduct) => {
        if (queriedProduct == null) {
            return Promise.reject({
                status: 404,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_NOT_FOUND)
            });
        }
        return Promise.resolve({
            status: 200,
            data: ProductHelper.mapProductData(queriedProduct)
        });
    });
});
//# sourceMappingURL=productQuery.js.map