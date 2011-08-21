#!/usr/bin/env node
var api = require('./models/api');
var longyAPI = new api();
var _ = require('underscore');

var optimist = require('optimist')
	.usage('Used to create new long links via longy url lengthener.\nUsage: $0')
	
	.options('action',{
		alias: 'a',
		describe: 'can be (create,lookup,stats,list)',
		demand: true,
		string: true
	}).check(function(argv){
		
		if( _.indexOf( ['create', 'lookup', 'stats', 'list'], argv.action ) < 0 )
			throw 'action can only be (create,lookup,stats,list)';
	})
	
	.options('url',{
		alias: 'u',
		describe: 'url to act on'
	})
	
	.option('id',{
		alias: 'hash',
		describe: 'id or hash of url to lookup/get stats'
	})
	
	.options('length',{
		alias: 'ln',
		describe: 'length of url to generate'
	});

var argv = optimist.argv;

switch(argv.a){
	case 'create':
		longyAPI.create( argv.url, argv.length, function(err,data){
			console.log(data);
		});
		break;
	case 'lookup':
		longyAPI.lookup( argv.id, function(err,data){
			console.log(data);
		});
		break;
	case 'stats':
		longyAPI.stats( argv.id, function(err,data){
			console.log(data);
		});
		break;
	case 'list':
		// don't do shiz like diz
		var i = 1;
		while( i < 240 ){
			longyAPI.lookup( i, function(err,data){
				if(!err)
					console.log( data.url );
			});
			i++;
		}
		break;
	default:
		optimist.showHelp();
		break;
}