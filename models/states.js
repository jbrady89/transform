var geocoderProvider = 'google';
var httpAdapter = 'http'; 
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);

var states = {

	// name : abbreviation
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District Of Columbia': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',

    getAbbreviation: function(state){
        //console.log(state);
    	var abbreviation = this[state];
    	return abbreviation;
    },

    getCoords: function(loc, schema, cb, next){
        //console.log(loc);
        console.log("76: " + loc);
        if (loc) {    	
            geocoder.geocode(loc)
        	.then(function(res) {
                //console.log(res);
                console.log(res);
    	    	var coords = [ res[0].longitude, res[0].latitude ];

    	    	cb.call(schema, coords, next);

    	    })
    	    .catch(function(err){
                console.log(err);
    	    	cb.call(schema, err, next);
    	    });
        } else  {
            var coords = [];
            console.log(coords);
            cb.call(schema, coords, next);
        }
    }

};

module.exports = states;