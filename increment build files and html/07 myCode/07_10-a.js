// $.each version without context setting with 'call', hasOwnProperty and returning the collection

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

	
	$.extend($, {
		
		isArray: function(obj) {
			
			return Object.prototype.toString.call(obj) === "[object Array]";
			
		},
		
		each: function(collection, callback) {
			
			if (isArrayLike(collection)) {
			
				for (var i = 0; i < collection.length; i++)	{
					
					callback(i, collection[i]);	
					
				}
				
			}
			else {
				
				for (var prop in collection) {
					
					callback(prop, collection[prop]);
					
				}	
				
			}
			
		}
		
	});
	
	
})();


var arr = ["first", "second", "third"];

var obj = {name: "John", occupation: "mechanic", state: "NJ"};


$.each(arr, function(index, item) {
	
	console.log(index + ". " + item);
	
});

$.each(obj, function(prop, value) {
	
	console.log(prop + ": " + value);	
	
});

function test(arg1, arg2, arg3) {
	
	console.log("Additive primary colors of a CRT color video display are:");
	
	$.each(arguments, function(index, item) {
		
		console.log(index + ". " + item);	
		
	});	
	
}

test("red", "blue", "green");










