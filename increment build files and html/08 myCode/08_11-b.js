(function() {
	
	$ = function(selector) {

        if (!(this instanceof $)) {     

            return new $(selector);

        }
        
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
			
			if (arguments.length) {    
				
				return $.each(this, function(index, item) {    
					
					item.innerHTML = newHtml;
					
				});
				
			}
            else {                      

                return this[0] && this[0].innerHTML;

            }	                   
			
		},

		val: function(newVal) {
			
			if (arguments.length) {    
				
				return $.each(this, function(index, item) {    
					
					item.value = newVal;
					
				});
				
			}
            else {                      

                return this[0] && this[0].value;

            }	                   
			
		},

		text: function(newText) {

			if(arguments.length) {
 
                return $.each(this, function(index, item) {

                    item.innerHTML = "";

                    var newTextNode = document.createTextNode(newText);

                    item.appendChild(newTextNode); 

                });

			}
            else {

                var firstElText = "";
                
                this[0] && findText(this[0]); // check if this[0] exists; short-circuit evaluation
                
                return firstElText;

                function findText(element) {

                    var elChildren = element.childNodes;

                    var len = elChildren.length;

                    for (var i = 0; i < len; i++) {

                        if (elChildren[i].nodeType === 3) {

                            firstElText += elChildren[i].nodeValue;

                        }
                        else if(elChildren[i].nodeType === 1) {

                            findText(elChildren[i]);

                        } 

                    } 

                }

            }

		}

		
	});
	
	
})();


//var ulChanged = $("ul").text("New Breed is coming");

//var pChanged = $("p").text("<div>New P Text</div>");

var ulFirstText = $("ul").text();
console.log(ulFirstText);

var ulFirstText = $("p").text();
console.log(ulFirstText);

console.log("<hr>", $("hr").text())

console.log("<button> doesn't exist on page", $("button").text())

