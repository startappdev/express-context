'use strict';

describe('Unit Test Session Context MiddleWare', function(){
    var contextMiddleware = require('../../lib/middleware/context.middleware');
    it ('Context Middleware should be a function', function(){
        expect(typeof contextMiddleware).toEqual('function');
    });
});