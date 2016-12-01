(function() {
	
	$ = function(selector) {};
	
	$.extend = function(target, object) {
		
		for (var prop in object) {
			
			if (object.hasOwnProperty(prop)) {
				
				target[prop] = object[prop];
				
			}
			
		}
		
		return target; 
	};
	
	// Static methods
	
	var isArrayLike = function(obj) {

		if (typeof obj.length === "number") {

			if (obj.length === 0) {

				return true;

			}
			else if (obj.length > 0) {

				return (obj.length - 1) in obj;

			}

		}
		
		return false;
			
	};
	
	
	var arr = [1, 2];
	
	var o = {0: "goo", 1: "foo"};

	var arrLike = {0: "zaz", 1: "bar", length: 2};
	
	var divs = document.getElementsByTagName("div");
	
	out = isArrayLike(arrLike);
	
	
	
	
	$.extend($, {
		
		isArray: function(obj) {
			
			return Object.prototype.toString.call(obj) === "[object Array]";
			
		}
		
	});
	
	
})();



// testing isArrayLike
var out;

var pid = document.getElementById("output");
console.log(out);
pid.innerHTML = out;