var csv = require('fast-csv');
var Providers = require('./controllers/providersController');

exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var providerFile = req.files.file;

    var providers = [];

    csv.fromString(providerFile.data.toString(), {
            headers: true,
            ignoreEmpty: true,
            trim:true
        })
        .on("data", function(data){
            data['Provider Id'] = parseInt(data['Provider Id']);
            data['Total Discharges'] = parseInt(data['Total Discharges']);
            data['Average Covered Charges'] = parseFloat(data['Average Covered Charges'].slice(1));
            data['Average Total Payments'] = parseFloat(data['Average Total Payments'].slice(1));
            data['Average Medicare Payments'] = parseFloat(data['Average Medicare Payments'].slice(1))
            providers.push(data);
        })
        .on("end", function(){
            Providers.create(providers, res);
        });
};