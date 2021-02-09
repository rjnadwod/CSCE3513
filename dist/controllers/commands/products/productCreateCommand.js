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
const productModel_1 = require("../models/productModel");
const ProductRepository = __importStar(require("../models/productModel"));
const resourceLookup_1 = require("../../../resourceLookup");
const DatabaseConnection = __importStar(require("../models/databaseConnection"));
const validateSaveRequest = (saveProductRequest) => {
    let errorMessage = "";
    if (Helper.isBlankString(saveProductRequest.lookupCode)) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_LOOKUP_CODE_INVALID);
    }
    else if ((saveProductRequest.count == null)
        || isNaN(saveProductRequest.count)) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_COUNT_INVALID);
    }
    else if (saveProductRequest.count < 0) {
        errorMessage = resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_COUNT_NON_NEGATIVE);
    }
    return ((errorMessage === "")
        ? { status: 200 }
        : {
            status: 422,
            message: errorMessage
        });
};
exports.execute = (saveProductRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResponse = validateSaveRequest(saveProductRequest);
    if (validationResponse.status !== 200) {
        return Promise.reject(validationResponse);
    }
    const productToCreate = {
        count: saveProductRequest.count,
        lookupCode: saveProductRequest.lookupCode
    };
    let createTransaction;
    return DatabaseConnection.createTransaction()
        .then((createdTransaction) => {
        createTransaction = createdTransaction;
        return ProductRepository.queryByLookupCode(saveProductRequest.lookupCode, createTransaction);
    }).then((queriedProduct) => {
        if (queriedProduct != null) {
            return Promise.reject({
                status: 409,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_LOOKUP_CODE_CONFLICT)
            });
        }
        return productModel_1.ProductModel.create(productToCreate, {
            transaction: createTransaction
        });
    }).then((createdProduct) => {
        createTransaction.commit();
        return {
            status: 201,
            data: {
                id: createdProduct.id,
                count: createdProduct.count,
                lookupCode: createdProduct.lookupCode,
                createdOn: Helper.formatDate(createdProduct.createdOn)
            }
        };
    }).catch((error) => {
        if (createTransaction != null) {
            createTransaction.rollback();
        }
        return Promise.reject({
            status: (error.status || 500),
            message: (error.message
                || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_UNABLE_TO_SAVE))
        });
    });
});
//# sourceMappingURL=productCreateCommand.js.map