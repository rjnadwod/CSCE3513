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
const SignInRouteController = __importStar(require("../controllers/signInRouteController"));
function signInRoutes(server) {
    server.get(routingLookup_1.RouteLookup.SignIn, SignInRouteController.start);
    server.post(routingLookup_1.RouteLookup.SignIn, SignInRouteController.signIn);
    server.delete((routingLookup_1.RouteLookup.API + routingLookup_1.RouteLookup.SignOut), SignInRouteController.clearActiveUser);
}
module.exports.routes = signInRoutes;
//# sourceMappingURL=signInRoutes.js.map