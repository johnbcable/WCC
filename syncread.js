'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('ExportIntegrationList.json');
let integrations = JSON.parse(rawdata);
console.log(integrations);

