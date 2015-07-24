var Tables = {

	birthday : {

        'capricorn':{
        	startDate: "December 22",
        	endDate: "January 19"
        },
        'aquarius':{
        	startDate: "January 20",
        	endDate: "February 18"
        },
        'pisces':{
        	startDate: "February 19",
        	endDate: "March 20"
        },
        'aries': {
        	startDate : "March 21",
        	endDate : "April 19"
        },
        'taurus':{
        	startDate: "April 20",
        	endDate: "May 20"
        },
        'gemini':{
        	startDate: "May 21",
        	endDate: "June 20"
        },
        'cancer':{
        	startDate: "June 21",
        	endDate: "July 22"
        },
        'leo':{
        	startDate: "July 23",
        	endDate: "August 22"
        },
        'virgo':{
        	startDate: "August 23",
        	endDate: "September 22"
        },
        'libra':{
        	startDate: "September 23",
        	endDate: "October 22"
        },
        'scorpio':{
        	startDate: "October 23",
        	endDate: "November 21"
        },
        'sagittarius':{
        	startDate: "November 22",
        	endDate: "December 21"
        }

	},

	body: {
		M:{		
			"boy_average":"Average",
			"boy_big":"Big & Tall/BBW",
			"boy_fit":"Athletic",
			"boy_large": "A Few Extra Pounds",
			"boy_muscular": '',
			"boy_skinny": "Thin",
			"no_answer":"Prefer Not To Say"
		},
		F:{
			"girl_athletic": "Athletic",
			"girl_big": "A Few Extra Pounds",
			"girl_curvy":'',
			"girl_fit": "Average",
			"girl_large": "Big & Tall/BBW",
			"girl_skinny": "Thin",
			"no_answer":"Prefer Not To Say"
		}
	},

	type: {
		"date": "Dating",
		"sugar": "Friends",
		"fun": "Hang Out",
		"soul": "Long Term"
	}
};
module.exports = Tables;