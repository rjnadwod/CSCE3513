import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as ProductDetailRouteController from "../controllers/productDetailRouteController";

function productDetailRoutes(server: express.Express) {
	//Get general discription of the product (Zachary C)
	server.get(
		RouteLookup.ProductDetail,
		ProductDetailRouteController.start);
	//Get the specific details of the product (Zachary C.)
	server.get(
		(RouteLookup.ProductDetail + RouteLookup.ProductIdParameter),
		ProductDetailRouteController.start);
	//Put the product into the database (Zachary C.)
	server.put(
		(RouteLookup.API + RouteLookup.ProductDetail
			+ RouteLookup.ProductIdParameter),
		ProductDetailRouteController.updateProduct);
	//Post product so that verified users could see it (Zachary C.)
	server.post(
		(RouteLookup.API + RouteLookup.ProductDetail),
		ProductDetailRouteController.createProduct);
	//Delete product (Zachary C.)
	server.delete(
		(RouteLookup.API + RouteLookup.ProductDetail
			+ RouteLookup.ProductIdParameter),
		ProductDetailRouteController.deleteProduct);
}

module.exports.routes = productDetailRoutes;
