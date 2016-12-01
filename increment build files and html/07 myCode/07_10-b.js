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
					
					var valueArr = collection[i];
					
					callback.call(valueArr, i, valueArr);	// set 'this' to current value in array	
					
				}
				
			}
			else {
				
				for (var prop in collection) {
					
					if(collection.hasOwnProperty(prop)) {	// only it's own properties
						
						var valueObj = collection[prop];
						
						callback.call(valueObj, prop, valueObj);  	// set 'this' to current value in object	
						
					}
					
				}	
				
			}
			
			return collection;
			
		}
		    
		
		
	});
	
	
})();


var arr = ["first", "second", "third"];

var obj = {name: "John", occupation: "mechanic", state: "NJ"};


var returnedArray = $.each(arr, function(index, item) {
	
	console.log(index + ". " + item);
	
});

console.log(returnedArray);

console.log("\n--------------------------------------\n");

$.each(obj, function(prop, value) {
	
	console.log(prop + ": " + value);	
	
});

console.log("\n--------------------------------------\n");

function test(arg1, arg2, arg3) {
	
	console.log("Additive primary colors of a CRT color video display are:");
	
	$.each(arguments, function(index, item) {
		
		console.log(index + ". " + item + " " + "this: " + this);	
		
	});	
	
}

test("red", "blue", "green");



