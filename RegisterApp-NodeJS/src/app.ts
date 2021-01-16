import path from "path";
import lusca from "lusca";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import * as fileSystem from "fs";
import bodyParser from "body-parser";
import compression from "compression";
import session from "express-session";
import { Resources } from "./resourceLookup";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Express configuration
app.set("port", (process.env.PORT || 15100));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
// app.set("trust proxy", 1); // TODO: This is for use with the session. Probably not necessary. trust first proxy
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// TODO: Default is an in-memory store, more robust solution would use something like Redis.
app.use(session(<session.SessionOptions>{
	resave: false,
	saveUninitialized: true,
	secret: "AAC5B99C-58ED-4FD0-A502-1489277657B0",
	cookie: <express.CookieOptions>{
		httpOnly: true,
		// secure: true, // TODO: Reset this variable after deploy to Heroku
		sameSite: "strict"
	}
}));

app.use(express.static(path.join(__dirname, "../public")));

fileSystem.readdirSync(__dirname + "/routes").forEach(function (routeConfig: string) {
	if (routeConfig.substr(-3) === ".js") {
		const route = require(__dirname + "/routes/" + routeConfig);
		route.routes(app);
	}
});

Resources.loadStrings();

export default app;