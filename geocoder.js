var geocoderProvider = 'google';
		var httpAdapter = 'http'; 
		var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);
    	geocoder.geocode('New York, New York', function(err, res) {
    		if (err) {
    			console.log(err);
    		}
	    	console.log(res);
	    	process.exit();
	    });