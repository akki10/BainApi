'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProviderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "Provider Id" : {       // Included for future purpose incase of update/delete api
        type: Number
    },
    "Provider Name" : {
        type: String
    },
    "Provider Street Address" : {
        type: String
    },
    "Provider City" : {
        type: String
    },
    "Provider State" : {
        type: String
    },
    "Provider Zip Code" : {
        type: String
    },
    "Hospital Referral Region Description" : {
        type: String
    },
    "Total Discharges" : {
        type: Number
    },
    "Average Covered Charges" : {
        type: Number, get: getPrice, set: setPrice
    },
    "Average Total Payments" : {
        type: Number, get: getPrice, set: setPrice
    },
    "Average Medicare Payments" : {
        type: Number, get: getPrice, set: setPrice
    }
});

function getPrice(num) {
    return "$"+(num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Providers', ProviderSchema);