// prev, parent and children implemented

(function() {
	
	$ = function(selector) {

        if (!(this instanceof $)) {     

            return new $(selector);

        }
        
		var elements;

		if (typeof selector === "string") {

			elements = document.querySelectorAll(selector); 	

		}
		else {

			elements = selector;

		}
        
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

    var getText = function(element) {

        var allChildrenText = "";

        $.each(element.childNodes, function(index, childItem) {

            if (childItem.nodeType === 3) {

                allChildrenText += childItem.nodeValue;

            }
            else if (childItem.nodeType === 1) {

                allChildrenText += getText(childItem);

            }    

        });

        return allChildrenText;

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

                this.html("");  
 
                return $.each(this, function(index, item) {

                    var newTextNode = document.createTextNode(newText);

                    item.appendChild(newTextNode); 

                });

			}
            else {
               
                return this[0] && getText(this[0]);    

            }

		},

		find: function(selector) {

			var elements = [];

			$.each(this, function(index, item) {

				var nodeList = item.querySelectorAll(selector);

                Array.prototype.push.apply(elements, nodeList);  

			});

			return $(elements);

		},

		next: function() {

            var elements = [];

            $.each(this, function(index, item) {

                var current = item.nextSibling;

                while (current && current.nodeType !== 1) {

                    current = current.nextSibling;

                }

                if (current) {  

                    elements.push(current);

                }

            });

            return $(elements);

        },

        prev: function() {

            var elements = [];

            $.each(this, function(index, item) {

                var current = item.previousSibling;

                while (current && current.nodeType !== 1) {

                    current = current.previousSibling;

                }

                if (current) {  

                    elements.push(current);

                }

            });

            return $(elements);

        },

		parent: function() {

			var elements = [];

			$.each(this, function(index, item) {

				elements.push(item.parentNode);		// if the item has no parent (document element doesn't have a parent) this pushes null on the elements array;		

			});

			return $(elements);

		},

		children: function() {

			var elements = [];

			$.each(this, function(index, item) {
				// item.children returns a HTML collection (array like object), so we have to spread it into individual elements
				var htmlCollection = item.children;		
				
				Array.prototype.push.apply(elements, htmlCollection);										//ES6; elements.push(...htmlCollection);		// if the item has no children this pushes null on the elements array;		

			});

			return $(elements);

		}

		
	});
	
	
})();


// prev, parent and children implemented

console.log("prev method testing")
console.log($("p#first"));
var firstPNext = $("p#first").prev();   
console.log(firstPNext);    // p#first doesn't have a previous sibling so it returns a $ object with length: 0


console.log($("li#lastCat"));
var lastItemCat = $("li#lastCat").prev().text("Hello there!");
console.log(lastItemCat); 

console.log($("li").prev());	// returns every li's previous sibling 

console.log("---------------------------------------");
console.log("parent method testing");

console.log($("p#first").parent());
console.log($("li").parent());

console.log("---------------------------------------");
console.log("children method testing");

console.log($("p#first").children());	// p#first doesn't have children (that are element nodes); empty $ object
console.log($("ul").children());
