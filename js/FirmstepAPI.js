//
//	FirmstepAPI.js
//
//	All Javascript routines to access Firmstep API areas outsied of Firmstep
//
//	Normally called from FirmstepAPI.asp
//
//  Global variables
//

// https://warwickshiredirect.achieveservice.com/api/crossreference/reference/list/apikey=a78d3c9afdbc9e55ec70894424416bd2ef9373a1263f52115344bd7ea794bb314628f33cf2a983845abc2bd40c26c03d94e8b51932ee2c7cb9d26dc0748f5bd0
var baseXrefURL = "https://warwickshiredirect.achieveservice.com/api/crossreference/reference/";
var xrefAPIkey = "/apikey=a78d3c9afdbc9e55ec70894424416bd2ef9373a1263f52115344bd7ea794bb314628f33cf2a983845abc2bd40c26c03d94e8b51932ee2c7cb9d26dc0748f5bd0";
var xrefquery = "list";
var myusername = "johncable@warwickshire.gov.uk";
var mypassword = "Hampton2019";

// Utility functions

// Register Handlebars helpers

// ============================================================================
function listXrefsForUCRN(myucrn) {

	xrefquery = "list";

	var url = new String(baseXrefURL + xrefquery + xrefAPIkey).toString();

	console.log(url);

	$.ajax({
		type: "POST",
		url: url,
		data: { ucrn: myucrn},
		contentType: "application/json",
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
		headers: {
			"Authorization": "Basic " + btoa(myusername+":"+mypassword)
		},
		success: function(data) {
			var jsonstring = JSON.stringify(data);

			console.log(jsonstring);

		},
		error: function(xhr, textStatus, errorThrown) {
			$('#error').html(xhr.responseText);
		}

	});  // end of ajax call

}

/*

posts = $.ajax({
    type: 'GET',
    url: ajaxurl,
    async: false,
    dataType: 'json',
    data: { action : 'getHotelsList' },
    done: function(results) {
        // uhm, maybe I don't even need this?
        JSON.parse(results);
        return results;
    },
    fail: function( jqXHR, textStatus, errorThrown ) {
        console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
    }
}).responseJSON; // <-- this instead of .responseText


*/



$(document).ready(function() {

	// ===========================================
	// Grades

	$('#allrefsforucrn').click( function(event) {
		event.preventDefault();
		listXrefsForUCRN('700026336');
	});

})  // end of document.ready
