var request = require('request');
var querystring = require('querystring');
var _ = require('underscore');

function API(options){
	if(!(this instanceof API))
		return new API( options );
	this.options = options;
}

module.exports = API;

API.prototype.apiCall = function( method, params, callback ){
	
	if(!method){
		callback( new Error('method required'), null );
		return;
	}
		
	// build uri
	var pathBase = 'http://patrick.forringer.com/lab/kohana/longy/api/';
	
	if(params.id){
		pathBase += params.id+'/'
		delete params.id;
	}
	
	pathBase += method+'.json';
	
	if( !_.isEmpty(params) )
		pathBase += '?'+querystring.stringify(params);
	
	//console.log('API: ', pathBase);
	
	request( {
		method: 'GET',
		uri: pathBase
	}, function( err, response, body ){
		
		try {
			body = JSON.parse(body);
		} catch(err) {
			callback( new Error('api error, json not returned'), null );
			return;
		}
		
		//console.log('API RETURNED: ', body);
		
		if(body.error)
			callback( new Error(body.error), body );
		else
			callback( err, body );	
	});
}

API.prototype.create = function( url, length, callback ){
	this.apiCall('create',{
		url:url,
		length:length
	},callback);
}

API.prototype.lookup = function( id, callback ){
	this.apiCall('lookup',{
		id:id
	},callback);
}

API.prototype.stats = function( id, callback ){
	this.apiCall('stats',{
		id:id
	},callback);
}