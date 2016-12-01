var $ = {};

$.extend = function(target, object) {
	
	for (var prop in object) {
		
		if (object.hasOwnProperty(prop)) {
			
			target[prop] = object[prop];
			
		}
		
	}
	
	return target; 
};

var target = {first: "Justin"};

var object = {last: "Meyer"};

var result = $.extend(target, object);

target === result; 



