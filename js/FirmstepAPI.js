//
//	FirmstepAPI.js
//
//	All Javascript routines to access Firmstep API areas outsied of Firmstep
//
//	Normally called from FirmstepAPI.asp
//
//  Global variables
//


var baseXrefURL = "https://warwickshiredirect.achieveservice.com/api/crossreference/reference/";
var xrefAPIkey = "/apikey=a78d3c9afdbc9e55ec70894424416bd2ef9373a1263f52115344bd7ea794bb314628f33cf2a983845abc2bd40c26c03d94e8b51932ee2c7cb9d26dc0748f5bd0";
var xrefquery = "list";
var myusername = "johncable@warbwickshire.gov.uk";
var mypassword = "Hampton2019";

// Utility functions

// Register Handlebars helpers

// ============================================================================
function listXrefsForUCRN(ucrn) {

	xrefquery = "list";

	var url = baseXrefURL + xrefquery + xrefAPIkey;

	console.log(url);

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		headers: {"Authorization": "Basic " + btoa("TECHADMIN6:Banzai29")},
		success: function(data) {
			var jsonstring = JSON.stringify(data);

			console.log(jsonstring);

		},
		error: function(xhr, textStatus, errorThrown) {
			$('#error').html(xhr.responseText);
		}

	});  // end of ajax call

}




$(document).ready(function() {

	// ===========================================
	// Grades

	$('#allrefsforucrn').click( function(event) {
		event.preventDefault();
		listXrefsForUCRN('700026336');
	});

})  // end of document.ready
