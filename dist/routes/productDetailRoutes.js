"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routingLookup_1 = require("../controllers/lookups/routingLookup");
const ProductDetailRouteController = __importStar(require("../controllers/productDetailRouteController"));
function productDetailRoutes(server) {
    server.get(routingLookup_1.RouteLookup.ProductDetail, ProductDetailRouteController.start);
    server.get((routingLookup_1.RouteLookup.ProductDetail + routingLookup_1.RouteLookup.ProductIdParameter), ProductDetailRouteController.start);
    server.put((routingLookup_1.RouteLookup.API + routingLookup_1.RouteLookup.ProductDetail
        + routingLookup_1.RouteLookup.ProductIdParameter), ProductDetailRouteController.updateProduct);
    server.post((routingLookup_1.RouteLookup.API + routingLookup_1.RouteLookup.ProductDetail), ProductDetailRouteController.createProduct);
    server.delete((routingLookup_1.RouteLookup.API + routingLookup_1.RouteLookup.ProductDetail
        + routingLookup_1.RouteLookup.ProductIdParameter), ProductDetailRouteController.deleteProduct);
}
module.exports.routes = productDetailRoutes;
//# sourceMappingURL=productDetailRoutes.js.map