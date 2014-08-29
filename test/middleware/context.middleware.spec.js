'use strict';

describe('Unit Test Session Context MiddleWare', function(){
    var sessionContextMiddleware = require('../../lib/middleware/context.middleware');
    it ('Session Context Middleware should be a function', function(){
        expect(typeof sessionContextMiddleware).toEqual('function');
    });
});