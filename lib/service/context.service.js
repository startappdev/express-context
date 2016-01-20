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
    var contextManipulator = new ContextManipulator(context, req);

    var promises = [];

    // For Each one in the context manipulation list
    for (var i in contextManipulators){

        // create a new promise
        var promise = Q.defer();
        promises.push(promise);

        // Set his internal ID
        contextManipulator._setId(i);

        // Run the manipulator
        try {
            contextManipulators[i](contextManipulator, function () {
                // Manipulation done
                promise.resolve('');
            });
        } catch (e) {
            // Error in manipulation
            promise.reject(e);
            console.log('ERR: ');
            console.error(e);
        }
    }

    // when all manipulation are done
    Q.allSettled(promises).then(function(results){
        for (var i in results){
            var isError = false;
            var error = '';

            // Add errors if exists
            if (results[i].state !== "fulfilled") {
                isError = true;
                error += '[ ' + results[i].reason + '] ';
            }

            // continue with a context
            callback(isError ? new Error(error) : null, context);
        }
    });
};