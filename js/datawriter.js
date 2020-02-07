    //  Define global-scoped dummy data if not data supllied on calls

    var noData = [
        {
            NODATA: 'No data supplied to function'
        }
    ];



    function convertArrayOfObjectsToDelimited(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;
        var rowkount = 0;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        // Default delimiter is comma
        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            rowkount++;
            console.log('Processing JSON object '+rowkount);
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;
                console.log(item[key]);
                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadDelimited(args) {
        var data, filename, link, sourcedata;

        sourcedata = args.data || noData;
        console.log('No. of items in the sourcedata '+sourcedata.length);
        var csv = convertArrayOfObjectsToDelimited({
            data: sourcedata
        });

        if (csv == null) return;
        console.log('Size of returned csv '+csv.length);

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
