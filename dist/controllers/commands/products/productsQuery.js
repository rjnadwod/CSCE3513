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
const ProductHelper = __importStar(require("./helpers/productHelper"));
const ProductRepository = __importStar(require("../models/productModel"));
exports.query = () => __awaiter(void 0, void 0, void 0, function* () {
    return ProductRepository.queryAll()
        .then((queriedProducts) => {
        return {
            status: 200,
            data: queriedProducts.map((queriedProduct) => {
                return ProductHelper.mapProductData(queriedProduct);
            })
        };
    });
});
//# sourceMappingURL=productsQuery.js.map