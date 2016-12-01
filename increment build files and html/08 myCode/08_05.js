(function() {
	
	$ = function(selector) {
		
		var elements = document.querySelectorAll(selector);

		Array.prototype.push.apply(this, elements);

	};


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
	
	
	$.extend($.prototype, {
		
		html: function(newHtml) {
			
			if (arguments.length) {     // html is called with an argument; html(arg) is a setter of innerHTML for all items 
				
				return $.each(this, function(index, item) {     // returning $.each makes the setter html function chainable because $.each returns the collection (in our case 'this'), see above
					
					item.innerHTML = newHtml;
					
				});
				
			}
            else {                       // html is called with no arguments; html() is a getter of innerHTML of the first item in the collection

                return this[0] && this[0].innerHTML;	// if the first operand is true it returns the second operand; || does the opposite

            }	                   
			
		}
		
	});
	
	
})();


var dogs = new $("#breeds li");

console.log(dogs);

/*
we can call html on dogs, dogs.html() because $ is constructor and returns the $ object
when we call dogs.html("<b>One breed to rule them all!</b>"), 'this' inside the html function is dogs (the collection of li's)
because we call .html() at the end firstItemText gets the return value of the else clause (innerHTML of the first element in collection)
*/
var firstItemText = dogs.html("<b>One breed to rule them all!</b>").html();

console.log(firstItemText);

var firstPara = new $("p#first").html("First is the best");

new $("form").html();	// doesn't exist and will throw an error if we don't use return this[0] && this[0].innerHTML;
