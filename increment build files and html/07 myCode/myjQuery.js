﻿(function() {
	
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
					
					callback.call(valueArr, i, valueArr);	
					
				}
				
			}
			else {
				
				for (var prop in collection) {
					
					if(collection.hasOwnProperty(prop)) {	
						
						var valueObj = collection[prop];
						
						callback.call(valueObj, prop, valueObj);

					}
					
				}	
				
			}
			
			return collection;
			
		},
		
		makeArray: function(arrLike) {
			
			var newArr = [];
		
			$.each(arrLike, function(index, item) {
				
				newArr.push(item);
				
			});
			
			return newArr;
			
		},
		
		proxy: function(fn, context) {
			
			return function() {
				
				return fn.apply(context, arguments);
				
			};
			
		}
		    
		
		
	});
	
	
})();

