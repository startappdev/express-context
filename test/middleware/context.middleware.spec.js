'use strict';

describe('Unit Test Context MiddleWare', function(){
    var expressContext = require('../../lib/express.context');

    var uniqueId1, uniqueId2;

    it ('Should verify all API\'s', function(){
        expect(typeof expressContext.sessionContext).toEqual('function');
        expect(typeof expressContext.addContextManipulator).toEqual('function');
    });

    it ('Should successfully add context manipulator for namespaces', function(){
        uniqueId1 = expressContext.addContextManipulator(function(contextManipulator, req, next){
            contextManipulator.addData({
                UNIQUE1 : 'UNIQUE1'
            });

            next();
        });

        uniqueId2 = expressContext.addContextManipulator(function(contextManipulator, req, next){
            contextManipulator.addData({
                UNIQUE2 : 'UNIQUE2'
            });

            next();
        });

        expressContext.addContextManipulator(function(contextManipulator, req, next){
            contextManipulator.addGlobal('test', {
                GLOBAL : 'GLOBAL'
            });

            next();
        });

        expect(uniqueId1).toEqual(jasmine.any(Number));
        expect(uniqueId1).toBeGreaterThan(-1);
        expect(uniqueId2).toEqual(jasmine.any(Number));
        expect(uniqueId2).toBeGreaterThan(-1);
    });

    it ('Should successfully get the context on the request', function(done){
        var req = {};

        expressContext.sessionContext(req, {}, function(){
            expect(typeof req.getContext).toEqual('function');

            done();
        });
    });

    it ('Should successfully get the global data from the context', function(done){
        var req = {};

        expressContext.sessionContext(req, {}, function(){
            expect(req.getContext().getData(uniqueId1)).toEqual({
                UNIQUE1 : 'UNIQUE1'
            });

            expect(req.getContext().getData(uniqueId2)).toEqual({
                UNIQUE2 : 'UNIQUE2'
            });

            expect(req.getContext().getGlobal().test).toEqual({
                GLOBAL : 'GLOBAL'
            });

            done();
        });
    });
});