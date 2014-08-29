'use strict';

/**
 * Helper object to manipulate Context object
 * @param context - {Context} - to manipulate
 * @param id - {Number} array location for the key to be saved at
 * @constructor
 */
function ContextManipulator(context){
    this._id;
    this._context = context;
}

/**
 * Sed Id of context namespace
 * @param id - {Number}
 * @private
 */
ContextManipulator.prototype._setId = function(id){
    this._id = id;
};

/**
 * Adds a data to the Context object
 * @param data - {Object} to add to the private module namespace
 */
ContextManipulator.prototype.addData = function(data){
    this._context._data[this._id] = data;
};

/**
 * Adds a data object at the specified key to the global namespace
 * @param key - {String} key to be saved at in the global namespace
 * @param data - {Object} data to save for the module
 */
ContextManipulator.prototype.addGlobal = function(key, data){
    this._context._global[key] = data;
};


module.exports = ContextManipulator;