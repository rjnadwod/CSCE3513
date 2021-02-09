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
const resourceLookup_1 = require("../resourceLookup");
const ProductQuery = __importStar(require("./commands/products/productQuery"));
const routingLookup_1 = require("./lookups/routingLookup");
const ProductCreateCommand = __importStar(require("./commands/products/productCreateCommand"));
const ProductDeleteCommand = __importStar(require("./commands/products/productDeleteCommand"));
const ProductUpdateCommand = __importStar(require("./commands/products/productUpdateCommand"));
const processStartProductDetailError = (res, error) => {
    let errorMessage = "";
    if ((error.status != null) && (error.status >= 500)) {
        errorMessage = error.message;
    }
    res.status((error.status || 500))
        .render(routingLookup_1.ViewNameLookup.ProductDetail, {
        product: {
            id: "",
            count: 0,
            lookupCode: ""
        },
        errorMessage: errorMessage
    });
};
exports.start = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return ProductQuery.queryById(req.params[routingLookup_1.ParameterLookup.ProductId])
        .then((productsCommandResponse) => {
        return res.render(routingLookup_1.ViewNameLookup.ProductDetail, {
            product: productsCommandResponse.data
        });
    }).catch((error) => {
        return processStartProductDetailError(res, error);
    });
});
const saveProduct = (req, res, performSave) => __awaiter(void 0, void 0, void 0, function* () {
    return performSave(req.body)
        .then((createProductCommandResponse) => {
        res.status(createProductCommandResponse.status)
            .send({
            product: createProductCommandResponse.data
        });
    }).catch((error) => {
        res.status(error.status || 500)
            .send({
            errorMessage: (error.message
                || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_UNABLE_TO_SAVE))
        });
    });
});
exports.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    saveProduct(req, res, ProductUpdateCommand.execute);
});
exports.createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    saveProduct(req, res, ProductCreateCommand.execute);
});
exports.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return ProductDeleteCommand.execute(req.params[routingLookup_1.ParameterLookup.ProductId])
        .then((deleteProductCommandResponse) => {
        res.status(deleteProductCommandResponse.status)
            .send({
            redirectUrl: routingLookup_1.RouteLookup.ProductListing
        });
    }).catch((error) => {
        res.status(error.status || 500)
            .send({
            errorMessage: (error.message
                || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_UNABLE_TO_DELETE))
        });
    });
});
//# sourceMappingURL=productDetailRouteController.js.map