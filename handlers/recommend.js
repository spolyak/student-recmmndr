var querystring = require('querystring');
var http = require('http');
var async = require('async');

var RECMMNDR_HOST = "api.rcmmndr.com";
var RECMMNDR_KEY = '/api_key/WtAN9dlAinrsLycMgTiMmDecYoskLc84HaQUTpFpDgo';

function PostPreference(prefstring) {
	// Build the post string from an object
	var post_data = querystring.stringify({});

	// An object of options to indicate where to post to
	var post_options = {
		host: RECMMNDR_HOST + '',
		port: '80',
		path: RECMMNDR_KEY + '/preference' + prefstring,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length
		}
	};

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			console.log('Response: ' + chunk);
		});
	});

	// post the data
	post_req.write(post_data);
	post_req.end();

}

function ClearAllPreferences() {
	var options = {
		host: RECMMNDR_HOST,
		port: 80,
		path: RECMMNDR_KEY + '/preference/_all',
		method: 'DELETE'
	};

	http.get(options, function(resp) {
		resp.on('data', function(chunk) {
			console.log('Response: ' + chunk);
		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
	});

}
var recommendation = [];

function GetRecommend(userid) {
	var options = {
		host: RECMMNDR_HOST,
		port: 80,
		path: RECMMNDR_KEY + '/recommend/' + userid
	};

	http.get(options, function(resp) {
		resp.on('data', function(chunk) {
			console.log('Response: ' + chunk);
			recommendation = chunk;
		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
	});	
}

exports.index = function(req, res) {

	console.log(req.body);

	async.series([
		function(callback) {
			ClearAllPreferences();
			callback(null, 'clear');
	    },
		function(callback) {
			//uid,iid,weight
			PostPreference('/1/100/5');
			PostPreference('/1/101/5');	
			PostPreference('/2/100/5');
			PostPreference('/2/101/5');
			PostPreference('/3/100/5');
			PostPreference('/4/100/5');
			PostPreference('/4/101/5');
			PostPreference('/5/100/5');
			PostPreference('/5/101/5');
			PostPreference('/6/100/5');
			PostPreference('/6/101/5');	
			PostPreference('/7/100/5');
			PostPreference('/7/101/5');	
			PostPreference('/8/100/5');
			PostPreference('/8/101/5');																			
			callback(null, 'adds');
		},
		function(callback) {
			//uid
			GetRecommend('3');
			callback(null, 'recc');
		}
	]);

	res.render('recommend', {
		title: 'recommend',
		recommend: recommendation
	});
};
