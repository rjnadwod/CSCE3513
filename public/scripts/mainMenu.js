//Determines what happens when main menu buttons are pressed
document.addEventListener("DOMContentLoaded", () => {
	getStartTransactionActionElement().addEventListener(
		"click",
		() => { displayError("Functionality has not yet been implemented."); }); //displays error

	getViewProductsActionElement().addEventListener(
		"click",
		() => { window.location.assign("/productListing"); }); //sends view to product listing page

	getCreateEmployeeActionElement().addEventListener(
		"click",
		() => { window.location.assign("/employeeDetail"); }); //sends view to employee detail

	getProductSalesReportActionElement().addEventListener(
		"click",
		() => { displayError("Functionality has not yet been implemented."); });

	getCashierSalesReportActionElement().addEventListener(
		"click",
		() => { displayError("Functionality has not yet been implemented."); });
});

// Getters and setters
function getViewProductsActionElement() {
	return document.getElementById("viewProductsButton");
}

function getCreateEmployeeActionElement() {
	return document.getElementById("createEmployeeButton");
}

function getStartTransactionActionElement() {
	return document.getElementById("startTransactionButton");
}

function getProductSalesReportActionElement() {
	return document.getElementById("productSalesReportButton");
}

function getCashierSalesReportActionElement() {
	return document.getElementById("cashierSalesReportButton");
}
// End getters and setters
