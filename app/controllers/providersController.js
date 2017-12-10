'use strict';

var mongoose = require('mongoose'),
    Providers = mongoose.model('Providers');

function makeQuery(_query) {
    var query = {};
    Object.keys(_query).forEach( function(q) {
        switch(q) {
            case 'max_discharges':
                if(!query['Total Discharges'])
                    query["Total Discharges"] = {};
                query["Total Discharges"]["$lte"] = parseInt(_query[q])
                break;
            case 'min_discharges':
                if(!query['Total Discharges'])
                    query["Total Discharges"] = {};
                query["Total Discharges"]["$gte"] = parseInt(_query[q])
                break;
            case 'max_average_covered_charges':
                if(!query['Average Covered Charges'])
                    query["Average Covered Charges"] = {};
                query["Average Covered Charges"]["$lte"] = parseFloat(_query[q])*100
                break;
            case 'min_average_covered_charges':
                if(!query['Average Covered Charges'])
                    query["Average Covered Charges"] = {};
                query["Average Covered Charges"]["$gte"] = parseFloat(_query[q])*100
                break;
            case 'min_average_medicare_payments':
                if(!query['Average Medicare Payments'])
                    query["Average Medicare Payments"] = {};
                query["Average Medicare Payments"]["$gte"] = parseFloat(_query[q])*100
                break;
            case 'max_average_medicare_payments':
                if(!query['Average Medicare Payments'])
                    query["Average Medicare Payments"] = {};
                query["Average Medicare Payments"]["$lte"] = parseFloat(_query[q])*100
                break;
            case 'state':
                query['Provider State'] = _query[q];
                break;
        }
    });
    return query;
}

exports.create = function(providers, res) {
    Providers.collection.insert(providers,function (err,documents) {
        if (err) {
            res.send(err);
        }
        res.send(providers.length + ' providers have been successfully uploaded.');
    });
};




exports.list_all = function(req, res, next) {
    var selection = {"DRG Definition":0};
    if(req.query['selection']) {
        try {
            selection = JSON.parse(req.query['selection']);
            if (Object.keys(selection).length == 0) {
                selection = {"DRG Definition": 0};
            }
        } catch (e) {
            res.send({"status": 0, "err_msg": e.message})
        }
    }

    // console.log(makeQuery(req.query),selection);

    var query =  Providers.find(makeQuery(req.query)).select(selection);

    if(req.query.page && req.query.pageSize) {
        var pageNo = parseInt(req.query.page);
        var pageSize = parseInt(req.query.pageSize)
        query.sort('Provider Id').skip(pageNo*pageSize).limit(pageSize)
    }

    query.exec(function (err, provider) {
        if (err) return next(err);
        Providers.count(makeQuery(req.query)).exec(function(err,count){
            if (err) return next(err);
            res.send({status:1,data:provider,count:count});
        });
    }).catch(function (err) {
        res.send({"status":0,"err_msg":err.message})
    });

};


// exports.read = function(req, res) {
//     Providers.findById(req.params.providerId, function(err, provider) {
//         if (err)
//             res.send(err);
//         res.json(provider);
//     });
// };
//
//
// exports.update = function(req, res) {
//     Providers.findOneAndUpdate({_id: req.params.providerId}, req.body, {new: true}, function(err, provider) {
//         if (err)
//             res.send(err);
//         res.json(provider);
//     });
// };
//
//
// exports.delete = function(req, res) {
//     Providers.remove({
//         _id: req.params.providerId
//     }, function(err, provider) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Providers successfully deleted' });
//     });
// };
