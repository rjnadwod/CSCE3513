"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const lusca_1 = __importDefault(require("lusca"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const fileSystem = __importStar(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const resourceLookup_1 = require("./resourceLookup");
dotenv_1.default.config({ path: ".env" });
const app = express_1.default();
app.set("port", (process.env.PORT || 15100));
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(helmet_1.default());
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
app.use(express_session_1.default({
    resave: false,
    saveUninitialized: true,
    secret: "AAC5B99C-58ED-4FD0-A502-1489277657B0",
    cookie: {
        httpOnly: true,
        sameSite: "strict"
    }
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
fileSystem.readdirSync(__dirname + "/routes").forEach(function (routeConfig) {
    if (routeConfig.substr(-3) === ".js") {
        const route = require(__dirname + "/routes/" + routeConfig);
        route.routes(app);
    }
});
resourceLookup_1.Resources.loadStrings();
exports.default = app;
//# sourceMappingURL=app.js.map