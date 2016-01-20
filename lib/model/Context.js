'use strict';

/**
 * Context object
 * @constructor
 */
function Context(){
    this._data = [];
    this._global = {};
}

/**
 * API to get a specific data from a context
 * @param id - {Number} id returned by addData method
 * @returns - {Object} the data registered for this module
 */
Context.prototype.getData = function(id){
    return this._data[id];
};

/**
 * API to get the global namespace object for the context
 * @returns {Object} global namespace
 */
Context.prototype.getGlobal = function(){
    return this._global;
};

module.exports = Context;