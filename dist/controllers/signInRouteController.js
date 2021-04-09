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
const EmployeeSignIn = __importStar(require("./commands/employees/employeeSignInCommand"));
const ClearActiveUser = __importStar(require("./commands/activeUsers/clearActiveUserCommand"));
const EmployeeExistsQuery = __importStar(require("./commands/employees/activeEmployeeExistsQuery"));
const routingLookup_1 = require("./lookups/routingLookup");
exports.start = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return EmployeeExistsQuery.query()
        .then((employeeExistsCommandResponse) => {
        if ((employeeExistsCommandResponse.data == null)
            || !employeeExistsCommandResponse.data) {
            return res.redirect(routingLookup_1.ViewNameLookup.EmployeeDetail);
        }
        return res.render(routingLookup_1.ViewNameLookup.SignIn, {
            employeeId: req.query[routingLookup_1.ParameterLookup.EmployeeId],
            errorMessage: resourceLookup_1.Resources.getString(req.query[routingLookup_1.QueryParameterLookup.ErrorCode])
        });
    }).catch((error) => {
        return res.render(routingLookup_1.ViewNameLookup.SignIn, {
            errorMessage: (error.message
                || resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.EMPLOYEES_UNABLE_TO_QUERY))
        });
    });
});
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return EmployeeSignIn.execute(req.body, req.session)
        .then(() => {
        return res.redirect(routingLookup_1.RouteLookup.MainMenu);
    }).catch((error) => {
        console.error("An error occurred when attempting to perform employee sign in. "
            + error.message);
        return res.redirect(routingLookup_1.RouteLookup.SignIn
            + "?" + routingLookup_1.QueryParameterLookup.ErrorCode
            + "=" + resourceLookup_1.ResourceKey.USER_UNABLE_TO_SIGN_IN);
    });
});
exports.clearActiveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session == null) {
        res.status(204)
            .send({ redirectUrl: routingLookup_1.RouteLookup.SignIn });
        return;
    }
    return ClearActiveUser.removeBySessionKey(req.session.id)
        .then((removeCommandResponse) => {
        res.status(removeCommandResponse.status)
            .send({ redirectUrl: routingLookup_1.RouteLookup.SignIn });
    }).catch((error) => {
        res.status(error.status || 500)
            .send({
            errorMessage: error.message,
            redirectUrl: routingLookup_1.RouteLookup.SignIn
        });
    });
});
//# sourceMappingURL=signInRouteController.js.map