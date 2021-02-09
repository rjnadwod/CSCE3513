"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helper = __importStar(require("../../helpers/helper"));
exports.mapProductData = (queriedProduct) => {
    return {
        id: queriedProduct.id,
        count: queriedProduct.count,
        lookupCode: queriedProduct.lookupCode,
        createdOn: Helper.formatDate(queriedProduct.createdOn)
    };
};
//# sourceMappingURL=productHelper.js.map