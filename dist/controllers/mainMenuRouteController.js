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
const Helper = __importStar(require("./helpers/routeControllerHelper"));
const EmployeeHelper = __importStar(require("./commands/employees/helpers/employeeHelper"));
const routingLookup_1 = require("./lookups/routingLookup");
const ValidateActiveUser = __importStar(require("./commands/activeUsers/validateActiveUserCommand"));
exports.start = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Helper.handleInvalidSession(req, res)) {
        return;
    }
    return ValidateActiveUser.execute(req.session.id)
        .then((activeUserCommandResponse) => {
        const isElevatedUser = EmployeeHelper.isElevatedUser(activeUserCommandResponse.data.classification);
        res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
        return res.render(routingLookup_1.ViewNameLookup.MainMenu, {
            isElevatedUser: isElevatedUser,
            errorMessage: resourceLookup_1.Resources.getString(req.query[routingLookup_1.QueryParameterLookup.ErrorCode])
        });
    }).catch((error) => {
        if (!Helper.processStartError(error, res)) {
            res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
            return res.render(routingLookup_1.ViewNameLookup.MainMenu, { errorMessage: error.message });
        }
    });
});
//# sourceMappingURL=mainMenuRouteController.js.map