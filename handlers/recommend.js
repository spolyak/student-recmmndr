var querystring = require('querystring');
var http = require('http');
var async = require('async');

var RECMMNDR_HOST = "api.rcmmndr.com";
var RECMMNDR_KEY = '/api_key/WtAN9dlAinrsLycMgTiMmDecYoskLc84HaQUTpFpDgo';
var majors = {};
majors['100'] = 'Accounting';
majors['101'] = 'Finance';
majors['102'] = 'Marketing';
majors['103'] = 'Computer Science';
majors['104'] = 'Architecture';
majors['105'] = 'Engineering';

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

function ClearAllPreferences(callback) {
	var options = {
		host: RECMMNDR_HOST,
		port: 80,
		path: RECMMNDR_KEY + '/preference/_all',
		method: 'DELETE'
	};

	http.get(options, function(resp) {
		resp.on('data', function(chunk) {
			console.log('Response: ' + chunk);
			callback(null, 'clear');
		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
		callback(null, 'clear');
	});

}

function GetRecommend(userid, res) {
	var options = {
		host: RECMMNDR_HOST,
		port: 80,
		path: RECMMNDR_KEY + '/recommend/' + userid
	};

	http.get(options, function(resp) {
		resp.on('data', function(chunk) {
			var recommendations = chunk;
			var recommendation_display = '';
		    for(var key in JSON.parse(recommendations)){
				recommendation_display = recommendation_display + ' ' + majors[key];    
		    }	
			res.render('recommend', {
				title: 'recommend',
				recommend: recommendation_display
			});		
		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
	});	
}

exports.index = function(req, res) {

	async.series([
		function(callback) {
			ClearAllPreferences(callback);
	    },
		function(callback) {
		    for(var key in req.body){
				//uid,iid,weight
				PostPreference(key);      
		    }																		
			callback(null, 'adds');
		},
		function(callback) {
			//uid
			GetRecommend('3', res);
			callback(null, 'recc');
		}
	]);
};
