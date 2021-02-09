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
const routingLookup_1 = require("./lookups/routingLookup");
const resourceLookup_1 = require("../resourceLookup");
const ProductsQuery = __importStar(require("./commands/products/productsQuery"));
const processStartProductListingError = (error, res) => {
    res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
    return res.status((error.status || 500))
        .render(routingLookup_1.ViewNameLookup.ProductListing, {
        products: [],
        isElevatedUser: false,
        errorMessage: (error.message
            || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCTS_UNABLE_TO_QUERY))
    });
};
exports.start = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return ProductsQuery.query()
        .then((productsCommandResponse) => {
        res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
        return res.render(routingLookup_1.ViewNameLookup.ProductListing, {
            products: productsCommandResponse.data
        });
    }).catch((error) => {
        return processStartProductListingError(error, res);
    });
});
//# sourceMappingURL=productListingRouteController.js.map