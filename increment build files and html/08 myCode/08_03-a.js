// for loop with setPrototypeOf and greet function on $.prototype

(function() {
	
	$ = function(selector) {
		
		var elements = document.querySelectorAll(selector);
		
		var elArrayLike = {};
		
		elArrayLike.length = elements.length;
		
		for (var i = 0; i < elements.length; i++) {
			
			elArrayLike[i] = elements[i];	
			
		}

        Object.setPrototypeOf(elArrayLike, $.prototype);
		
		return elArrayLike;
		
	};

    $.prototype.greet = function() {

        console.log("Greetings from " + this["0"].textContent);

    }

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


var parag = $("p");
console.log(parag);

var breeds = $("#breeds");
console.log(breeds);

var items = $("li");
console.log(items);

items.greet();