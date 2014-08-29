'use strict';

var Q = require('q'),
    Context = require('../model/Context'),
    ContextManipulator = require('../model/ContextManipulator');

var contextManipulators = [];

/**
 * API to add a context manipulator
 * @param manipulatorFn - {Function} in the form of function(contextManipulator, req)
 * @returns {Number} id - unique to get the data with
 */
exports.addContextManipulator = function(manipulatorFn){
    if (typeof manipulatorFn === 'function') {
        contextManipulators.push(manipulatorFn);

        return contextManipulators.length - 1;
    } else {
        return -1;
    }
};

/**
 * Create a context object
 * @param req - {Request}
 * @param callback - {Function} in the form of callback(err, context)
 *          err - Error
 *          context - {Context}
 */
exports.createContext = function(req, callback){
    var context = new Context();
    var contextManipulator = new ContextManipulator(context);

    var promises = [];

    for (var i in contextManipulators){
        console.log(i);
        var promise = Q.defer();
        promises.push(promise);

        contextManipulator._setId(i);

        try {
            contextManipulators[i](contextManipulator, req, function () {
                promise.resolve('');
            });
        } catch (e) {
            promise.reject(e);
            console.log(e);
        }
    }

    Q.allSettled(promises).then(function(results){
        for (var i in results){
            var isError = false;
            var error = '';

            if (results[i].state !== "fulfilled") {
                isError = true;
                error += '[ ' + results[i].reason + '] ';
            }

            callback(isError ? new Error(error) : null, context);
        }
    });
};