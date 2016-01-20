'use strict';

var contextMiddleware = require('./middleware/context.middleware'),
    contextService = require('./service/context.service');

/**
 * Express Middleware to handle context
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function} next middleware
 */
module.exports.middleware = contextMiddleware.middleware;

/**
 * API to add a context manipulator
 * @param manipulatorFn - {Function} in the form of function(contextManipulator, req, next)
 * @returns {Number} id - unique to get the data with
 */
module.exports.addContextManipulator = contextService.addContextManipulator;