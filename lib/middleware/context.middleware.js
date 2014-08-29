'use strict';

var contextService = require('../service/context.service');

/**
 * Express Middleware to handle context
 * @param req - {Request}
 * @param res - {Response}
 * @param next - {Function} next middleware
 */
module.exports.middleware = function(req,res,next){
    contextService.createContext(req, function(err, context){
        // Print error and continue
        if (err){
            console.log(err);
        }

        // Piggy bag the context to the request
        req.getContext = function(){
            return context;
        };

        next();
    })
};