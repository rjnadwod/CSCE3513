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
const Helper = __importStar(require("./helpers/routeControllerHelper"));
const resourceLookup_1 = require("../resourceLookup");
const ProductQuery = __importStar(require("./commands/products/productQuery"));
const EmployeeHelper = __importStar(require("./commands/employees/helpers/employeeHelper"));
const ProductCreateCommand = __importStar(require("./commands/products/productCreateCommand"));
const ProductDeleteCommand = __importStar(require("./commands/products/productDeleteCommand"));
const ProductUpdateCommand = __importStar(require("./commands/products/productUpdateCommand"));
const ValidateActiveUser = __importStar(require("./commands/activeUsers/validateActiveUserCommand"));
const routingLookup_1 = require("./lookups/routingLookup");
const processStartProductDetailError = (res, error, currentUser) => {
    if (Helper.processStartError(error, res)) {
        return;
    }
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
        errorMessage: errorMessage,
        isElevatedUser: ((currentUser != null)
            && EmployeeHelper.isElevatedUser(currentUser.classification))
    });
};
exports.start = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.handleInvalidSession(req, res)) {
        return;
    }
    let currentUser;
    return ValidateActiveUser.execute(req.session.id)
        .then((activeUserCommandResponse) => {
        currentUser = activeUserCommandResponse.data;
        return ProductQuery.queryById(req.params[routingLookup_1.ParameterLookup.ProductId]);
    }).then((productsCommandResponse) => {
        return res.render(routingLookup_1.ViewNameLookup.ProductDetail, {
            product: productsCommandResponse.data,
            isElevatedUser: EmployeeHelper.isElevatedUser(currentUser.classification)
        });
    }).catch((error) => {
        return processStartProductDetailError(res, error, currentUser);
    });
});
const saveProduct = (req, res, performSave) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.handleInvalidApiSession(req, res)) {
        return;
    }
    return ValidateActiveUser.execute(req.session.id)
        .then((activeUserCommandResponse) => {
        if (!EmployeeHelper.isElevatedUser(activeUserCommandResponse.data.classification)) {
            return Promise.reject({
                status: 403,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NO_PERMISSIONS)
            });
        }
        return performSave(req.body);
    }).then((createProductCommandResponse) => {
        res.status(createProductCommandResponse.status)
            .send({
            product: createProductCommandResponse.data
        });
    }).catch((error) => {
        return Helper.processApiError(error, res, {
            redirectBaseLocation: routingLookup_1.RouteLookup.ProductListing,
            defaultErrorMessage: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_UNABLE_TO_SAVE)
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
    if (Helper.handleInvalidApiSession(req, res)) {
        return;
    }
    return ValidateActiveUser.execute(req.session.id)
        .then((activeUserCommandResponse) => {
        if (!EmployeeHelper.isElevatedUser(activeUserCommandResponse.data.classification)) {
            return Promise.reject({
                status: 403,
                message: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NO_PERMISSIONS)
            });
        }
        return ProductDeleteCommand.execute(req.params[routingLookup_1.ParameterLookup.ProductId]);
    }).then((deleteProductCommandResponse) => {
        res.status(deleteProductCommandResponse.status)
            .send({
            redirectUrl: routingLookup_1.RouteLookup.ProductListing
        });
    }).catch((error) => {
        return Helper.processApiError(error, res, {
            redirectBaseLocation: routingLookup_1.RouteLookup.ProductListing,
            defaultErrorMessage: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.PRODUCT_UNABLE_TO_DELETE)
        });
    });
});
//# sourceMappingURL=productDetailRouteController.js.map