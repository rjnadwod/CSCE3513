"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fileSystem = __importStar(require("fs"));
let stringMapping = {};
const stringResourceFilePath = "../public/resources/strings/en-US/strings.json";
exports.Resources = {
    loadStrings: () => {
        const fileContents = fileSystem.readFileSync(path.join(__dirname, stringResourceFilePath));
        stringMapping = JSON.parse(fileContents.toString());
    },
    getString: (key) => {
        if ((key == null) || (stringMapping[key] == null)) {
            return "";
        }
        return stringMapping[key];
    }
};
var ResourceKey;
(function (ResourceKey) {
    ResourceKey["PRODUCT_NOT_FOUND"] = "0010001";
    ResourceKey["PRODUCT_UNABLE_TO_SAVE"] = "0010002";
    ResourceKey["PRODUCT_UNABLE_TO_DELETE"] = "0010003";
    ResourceKey["PRODUCTS_UNABLE_TO_QUERY"] = "0010004";
    ResourceKey["EMPLOYEE_NOT_FOUND"] = "0010201";
    ResourceKey["EMPLOYEE_UNABLE_TO_SAVE"] = "0010202";
    ResourceKey["EMPLOYEE_UNABLE_TO_DELETE"] = "0010203";
    ResourceKey["EMPLOYEE_UNABLE_TO_QUERY"] = "0010204";
    ResourceKey["EMPLOYEES_UNABLE_TO_QUERY"] = "0010205";
    ResourceKey["USER_SESSION_NOT_FOUND"] = "0100001";
    ResourceKey["USER_NOT_FOUND"] = "0100002";
    ResourceKey["USER_SESSION_NOT_ACTIVE"] = "0100003";
    ResourceKey["USER_UNABLE_TO_SIGN_IN"] = "0100004";
    ResourceKey["USER_SIGN_IN_CREDENTIALS_INVALID"] = "0100005";
    ResourceKey["USER_UNABLE_TO_SIGN_OUT"] = "0100006";
    ResourceKey["USER_NO_PERMISSIONS"] = "0100007";
    ResourceKey["PRODUCT_RECORD_ID_INVALID"] = "0102001";
    ResourceKey["PRODUCT_LOOKUP_CODE_INVALID"] = "0102002";
    ResourceKey["PRODUCT_COUNT_INVALID"] = "0102003";
    ResourceKey["PRODUCT_COUNT_NON_NEGATIVE"] = "0102004";
    ResourceKey["PRODUCT_LOOKUP_CODE_CONFLICT"] = "0102005";
    ResourceKey["EMPLOYEE_RECORD_ID_INVALID"] = "0104001";
    ResourceKey["EMPLOYEE_FIRST_NAME_INVALID"] = "0104002";
    ResourceKey["EMPLOYEE_LAST_NAME_INVALID"] = "0104003";
    ResourceKey["EMPLOYEE_PASSWORD_INVALID"] = "0104004";
    ResourceKey["EMPLOYEE_TYPE_INVALID"] = "0104005";
    ResourceKey["EMPLOYEE_MANAGER_ID_INVALID"] = "0104006";
    ResourceKey["EMPLOYEE_EMPLOYEE_ID_INVALID"] = "0104007";
    ResourceKey["EMPTY_UUID"] = "0202001";
})(ResourceKey = exports.ResourceKey || (exports.ResourceKey = {}));
//# sourceMappingURL=resourceLookup.js.map