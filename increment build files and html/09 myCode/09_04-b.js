// refactoring next, prev, parent, children with helper method "makeTraverser", version 2

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


    /*

	parent: makeTraverser(function cbFunc(arr, eachItem) {

		arr.push(eachItem.parentNode);	

	})
        
    */

    var makeTraverser = function(cb) {

		return function() {

			var elements = [];

        	$.each(this, function(index, item) {

            	cb(elements, item);

        	});

        	return $(elements);

		};

    }


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
		// find doesn't work beacuse selector is undefined
		/*
		find: makeTraverser(function cbFunc(arr, eachItem) {

			var nodeList = eachItem.querySelectorAll(selector);

            Array.prototype.push.apply(arr, nodeList);  	

		}),
		*/

		next: makeTraverser(function cbFunc(arr, eachItem) {
   
			var current = eachItem.nextSibling;

			while (current && current.nodeType !== 1) {

				current = current.nextSibling;

			}

			if (current) {  

				arr.push(current);

			}

        }),

        prev: makeTraverser(function cbFunc(arr, eachItem) {

			var current = eachItem.previousSibling;

			while (current && current.nodeType !== 1) {

				current = current.previousSibling;

			}

			if (current) {  

				arr.push(current);

			}

		}),

		// refactored with makeTraverser called with a callback function
		parent: makeTraverser(function cbFunc(arr, eachItem) {

			arr.push(eachItem.parentNode);	

		}),

		// refactored with makeTraverser called with a callback function
		children: makeTraverser(function cbFunc(arr, eachItem) {

			var htmlCollection = eachItem.children;

			Array.prototype.push.apply(arr, htmlCollection);

		}) 

			
	});
	
	
})();


// find, next, prev, parent and children implemented
/*
console.log("find method testing")

var breedItems = $("ul.breeds").find("li");
console.log(breedItems);	 // proof that find method returns a $ object
console.log(breedItems.text());	// returns text of first li
*/

console.log("---------------------------------------");
console.log("next method testing")

console.log($("p#first"));
var firstPNext = $("p#first").next().text("Hello there!");
console.log(firstPNext);


console.log($("li#lastCat"));
var lastItemCat = $("li#lastCat").next()
console.log(lastItemCat); // li#lastCat doesn't have a next sibling so it returns a $ object with length: 0

console.log($("li").next());	// returns every li's next sibling 

console.log("---------------------------------------");
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
