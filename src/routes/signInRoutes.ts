import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as SignInRouteController from "../controllers/signInRouteController";


function signInRoutes(server: express.Express) {
	// open sign in route controller (PS)
	server.get(RouteLookup.SignIn, SignInRouteController.start);
	
	// Maggie, look at this post request. Does it look correct?
	// Payton -- looks good to me!
	server.post(RouteLookup.SignIn, SignInRouteController.signIn);

	//clear user (MA)
	server.delete(
		(RouteLookup.API + RouteLookup.SignOut),
		SignInRouteController.clearActiveUser);		// clearing user when sign out (PS)
}

module.exports.routes = signInRoutes;
