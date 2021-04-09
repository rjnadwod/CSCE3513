"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resourceLookup_1 = require("../../resourceLookup");
const routingLookup_1 = require("../lookups/routingLookup");
const baseNoPermissionsRedirectUrl = ("/?" + routingLookup_1.QueryParameterLookup.ErrorCode
    + "=" + resourceLookup_1.ResourceKey.USER_NO_PERMISSIONS);
const defaultNoPermissionsRedirectBaseLocation = routingLookup_1.RouteLookup.MainMenu;
exports.invalidSessionRedirectUrl = (routingLookup_1.RouteLookup.SignIn
    + "/?" + routingLookup_1.QueryParameterLookup.ErrorCode
    + "=" + resourceLookup_1.ResourceKey.USER_SESSION_NOT_ACTIVE);
exports.buildNoPermissionsRedirectUrl = (redirectBaseLocation) => {
    return ((redirectBaseLocation || defaultNoPermissionsRedirectBaseLocation)
        + baseNoPermissionsRedirectUrl);
};
exports.handleInvalidSession = (req, res) => {
    if (req.session != null) {
        return false;
    }
    res.redirect(exports.invalidSessionRedirectUrl);
    return true;
};
exports.processStartError = (error, res, redirectBaseLocation) => {
    let processedStartError = false;
    if ((error.status != null) && (error.status === 404)
        && (error.message === resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NOT_FOUND))) {
        res.redirect(exports.invalidSessionRedirectUrl);
        processedStartError = true;
    }
    else if ((error.status != null) && (error.status === 403)
        && (error.message === resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NO_PERMISSIONS))) {
        res.redirect(exports.buildNoPermissionsRedirectUrl(redirectBaseLocation));
        processedStartError = true;
    }
    return processedStartError;
};
exports.handleInvalidApiSession = (req, res) => {
    if (req.session != null) {
        return false;
    }
    res.status(404)
        .send({
        redirectUrl: exports.invalidSessionRedirectUrl,
        errorMessage: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_SESSION_NOT_FOUND)
    });
    return true;
};
exports.processApiError = (error, res, errorHints) => {
    if (errorHints == null) {
        errorHints = {};
    }
    if ((error.status != null) && (error.status === 404)
        && (error.message === resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NOT_FOUND))) {
        res.status(error.status)
            .send({
            redirectUrl: exports.invalidSessionRedirectUrl,
            errorMessage: resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_SESSION_NOT_FOUND),
        });
    }
    else if ((error.status != null) && (error.status === 403)
        && (error.message === resourceLookup_1.Resources.getString(resourceLookup_1.ResourceKey.USER_NO_PERMISSIONS))) {
        res.status(error.status)
            .send({
            errorMessage: error.message,
            redirectUrl: exports.buildNoPermissionsRedirectUrl(errorHints.redirectBaseLocation)
        });
    }
    else {
        res.status((error.status || 500))
            .send({
            errorMessage: (error.message || errorHints.defaultErrorMessage)
        });
    }
};
//# sourceMappingURL=routeControllerHelper.js.map