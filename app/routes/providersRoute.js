'use strict';
module.exports = function(app) {
    var provider = require('../controllers/providersController');

    app.route('/providers')
        .get(provider.list_all)
        // .put(providers.create)


    // app.route('/providers/:providerId')
    //     .get(provider.read)
    //     .post(provider.update)
    //     .delete(providers.delete);
};