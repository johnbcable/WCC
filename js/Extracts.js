//
//	Extracts.js
//
//	Javascript code dealing with manipulation of data extracts
//  from Firmstep JSON downloads
//
//

var baseURL = 'http://localsites/WCC/';

function extractServerFromURL(args) {
	// We need to extract what is immediately after the // and before the next /
	var data = args.url || null;
	var server = new String('').toString();

	if (data) {
		var startpos = data.indexOf('://');
		var endpos = data.indexOf('/', startpos + 3);
		var server = data.slice(startpos + 3, endpos);
	}
	return server;
}

function getWebServiceIntegrationData() {
	var summaryintegrationdata = new Array();
	var summaryintegrationobject = new Object();

	var url = new String(baseURL + 'WebServiceIntegrationList.json').toString();
	// var eventsfound = false;

	console.log('Inside getWebServiceIntegrationData for URL ' + url);

	$.getJSON(url, function(data) {
		console.log('Inside getJSON');

		// Now loop through returned data correcting it as required.

		var jsonstring = JSON.stringify(data);

		jsonstring = new String('{allIntegrations :' + jsonstring + '}');

		// var eventdata = $.parseJSON(jsonstring);
		var integrationdata = eval('(' + jsonstring + ')');

		// Now need to accumulate summary data from fixturedata

		// Loop through integrationdata
		var limName = new String('').toString();
		var rowkount = 0;
		var singleintegration = null;
		var outputDetails = null;
		var server = null;

		$.each(integrationdata, function() {
			$.each(this, function() {
				rowkount++;
				// Only interested in WCC or LIM14 integrations
				limName = new String(this.LIM_name).toString();

				singleintegration = new Object();
				singleintegration.Name = this.Name;
				singleintegration.LIM_name = this.LIM_name;
				singleintegration.Category = this.Category;

				outputDetails = new Object();

				outputDetails = JSON.parse(this.Output_template);

				console.log(outputDetails);
				console.log('ZZZZZ ' + outputDetails.endpoint);

				singleintegration.endpoint = outputDetails.endpoint;
				server = extractServerFromURL({ url: outputDetails.endpoint });
				singleintegration.server = server;

				summaryintegrationdata.push(singleintegration);

				singleintegration = null;
				outputDetails = null;
				server = null;
			});
		});

		// console.log(url);

		// var jsonstring = JSON.stringify(data);

		// jsonstring = new String("{allAnonymousWorkers:"+jsonstring+"}");

		// var eventdata = $.parseJSON(jsonstring);
		// var anonymousworkerdata = eval("(" + jsonstring + ")");

		// Set the boolean if we have data
		// if (eventdata.length > 1)
		//	eventsfound = true;

		// $("#receivedjson").append(jsonstring);

		console.log(JSON.stringify(summaryintegrationdata));
		console.log('Rowkount: '+rowkount.toString());

		downloadDelimited({
			data: summaryintegrationdata,
			filename: 'WCCWebServiceIntegrations.csv',
			columnDelimiter: ','
		});
	}); // end of function(data)
}

function getPrintablesIntegrationData() {
	var summaryintegrationdata = new Array();

	var url = './ExportPrintableIntegrationList.json';
	// var eventsfound = false;
	$.getJSON(url, function(data) {
		// Now loop through returned data correcting it as required.

		var jsonstring = JSON.stringify(data);

		jsonstring = new String('{allIntegrations :' + jsonstring + '}');

		// var eventdata = $.parseJSON(jsonstring);
		var integrationdata = eval('(' + jsonstring + ')');

		// Now need to accumulate summary data from fixturedata

		// Loop through integrationdata
		var limName = new String('').toString();
		$.each(integrationdata, function() {
			$.each(this, function() {
				// Only interested in WCC or LIM14 integrations
				limName = new String(this.LIM_name).toString();

				var singleintegration = new Object();
				singleintegration.Name = this.Name;
				singleintegration.LIM_name = this.LIM_name;
				singleintegration.Category = this.Category;
				singleintegration.Data_type = this.data_type;

				summaryintegrationdata.push(singleintegration);

				singleintegration = null;
			});
		});

		// console.log(url);

		// var jsonstring = JSON.stringify(data);

		// jsonstring = new String("{allAnonymousWorkers:"+jsonstring+"}");

		// var eventdata = $.parseJSON(jsonstring);
		// var anonymousworkerdata = eval("(" + jsonstring + ")");

		// Set the boolean if we have data
		// if (eventdata.length > 1)
		//	eventsfound = true;

		// $("#receivedjson").append(jsonstring);

		downloadDelimited({
			data: summaryintegrationdata,
			filename: 'WCCPrintablesdIntegrations.csv',
			columnDelimiter: ','
		});
	}); // end of function(data)
}

function getDatabaseIntegrationData() {
	var summaryintegrationdata = new Array();
	var summaryintegrationobject = new Object();

	var url = './ExportDatabaseIntegrationList.json';

	// var eventsfound = false;
	$.getJSON(url, function(data) {
		// Now loop through returned data correcting it as required.

		var jsonstring = JSON.stringify(data);

		jsonstring = new String('{allIntegrations :' + jsonstring + '}');

		// var eventdata = $.parseJSON(jsonstring);
		var integrationdata = eval('(' + jsonstring + ')');

		// Now need to accumulate summary data from fixturedata

		// Loop through integrationdata

		var limName = new String('').toString();
		$.each(integrationdata, function() {
			$.each(this, function() {
				// Only interested in WCC or LIM14 integrations
				limName = new String(this.LIM_name).toString();

				var singleintegration = new Object();
				singleintegration.Name = this.Name;
				singleintegration.LIM_name = this.LIM_name;
				singleintegration.Category = this.Category;
				singleintegration.data_type = this.data_type;

				var outputDetails = new Object();

				outputDetails = JSON.parse(this.Output_template);

				// console.log(outputDetails);
				// console.log('ZZZZZ '+outputDetails.endpoint);

				singleintegration.systemname = outputDetails.systemName;

				summaryintegrationdata.push(singleintegration);

				singleintegration = null;
				outputDetails = null;
			});
		});

		// console.log(integrationdata);

		// var jsonstring = JSON.stringify(data);

		// jsonstring = new String("{allAnonymousWorkers:"+jsonstring+"}");

		// var eventdata = $.parseJSON(jsonstring);
		// var anonymousworkerdata = eval("(" + jsonstring + ")");

		// Set the boolean if we have data
		// if (eventdata.length > 1)
		//	eventsfound = true;

		// $("#receivedjson").append(jsonstring);

		downloadDelimited({
			data: summaryintegrationdata,
			filename: 'WCCDatabaseIntegrations.csv',
			columnDelimiter: ','
		});
	}); // end of function(data)
}

//
function getHTTPIntegrationData() {
	var summaryintegrationdata = new Array();
	var summaryintegrationobject = new Object();

	var url = './HTTPIntegrationList.json';
	// var eventsfound = false;
	$.getJSON(url, function(data) {
		// Now loop through returned data correcting it as required.

		var jsonstring = JSON.stringify(data);

		jsonstring = new String('{allIntegrations :' + jsonstring + '}');

		// var eventdata = $.parseJSON(jsonstring);
		var integrationdata = eval('(' + jsonstring + ')');

		// Now need to accumulate summary data from fixturedata

		// Loop through integrationdata
		var limName = new String('').toString();
		$.each(integrationdata, function() {
			$.each(this, function() {
				// Only interested in WCC or LIM14 integrations
				limName = new String(this.LIM_name).toString();

				var singleintegration = new Object();
				singleintegration.Name = this.Name;
				singleintegration.LIM_name = this.LIM_name;
				singleintegration.Category = this.Category;

				var outputDetails = new Object();

				outputDetails = JSON.parse(this.Output_template);

				// console.log(outputDetails);
				// console.log('ZZZZZ '+outputDetails.endpoint);

				singleintegration.endpoint = outputDetails.endpoint;
				var server = extractServerFromURL({ url: outputDetails.endpoint });
				singleintegration.server = server;

				summaryintegrationdata.push(singleintegration);

				singleintegration = null;
				outputDetails = null;
			});
		});

		// console.log(url);

		// var jsonstring = JSON.stringify(data);

		// jsonstring = new String("{allAnonymousWorkers:"+jsonstring+"}");

		// var eventdata = $.parseJSON(jsonstring);
		// var anonymousworkerdata = eval("(" + jsonstring + ")");

		// Set the boolean if we have data
		// if (eventdata.length > 1)
		//	eventsfound = true;

		// $("#receivedjson").append(jsonstring);

		downloadDelimited({ data: summaryintegrationdata, filename: 'WCCHTTPIntegrations.csv', columnDelimiter: ',' });
	}); // end of function(data)
}

$(document).ready(function() {
	console.log('jQuery loaded');
}); // end of document.ready
