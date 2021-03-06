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
    
    var makeTraverser = function(cb) {

		return function() {
           
			var elements = [];

            var args = arguments;

        	$.each(this, function(index, item) {   

                var ret = cb.apply(item, args);   

                if (ret && isArrayLike(ret)) {

                    Array.prototype.push.apply(elements, ret);  

                }
                else if (ret) {

                    elements.push(ret);

                }

        	});

        	return $(elements);

		};

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
		
		find: makeTraverser(function(selector) {
            
			var nodeList = this.querySelectorAll(selector);

            return nodeList;  	

		}),

		next: makeTraverser(function() {
   
			var current = this.nextSibling;

			while (current && current.nodeType !== 1) {

				current = current.nextSibling;

			}

			if (current) { 
				
				return current; 
			
			}

        }),

        prev: makeTraverser(function () {

			var current = this.previousSibling;

			while (current && current.nodeType !== 1) {

				current = current.previousSibling;

			}

			return current;

		}),

		parent: makeTraverser(function() {

			return this.parentNode;	

		}),

		children: makeTraverser(function() {

            return this.children;

		}),

		attr: function(attrName, value) {
			
			if (arguments.length === 2) {    
				
				return $.each(this, function(index, item) {    
					
					item.setAttribute(attrName, value);
					
				});
				
			}
            else if (arguments.length === 1)  {                      

                return this[0] && this[0].getAttribute(attrName);

            }
            else {             

                return this;

            }	                   
			
		},

		css: function(cssPropName, value) {

			if (arguments.length === 2) {    
				
				return $.each(this, function(index, item) {    
					
					item.style[cssPropName] = value;
					
				});
				
			}
            else if (arguments.length === 1)  {                      

                return this[0] && document.defaultView.getComputedStyle(this[0]).getPropertyValue(cssPropName);

            }
            else {             

                return this;

            }	   			

		},

        width: function(elWidth) {

            if (arguments.length === 1) {

			    this.css("width", elWidth);
				
			}
            else {
 
                return this[0] && this.css("width");    // css called with only one argument gets the value of the first element in a collection

            }       

        },

        offset: function() {    // Get the current coordinates of the first element in the set of matched elements, relative to the document (page)

            var viewOffset = this[0].getBoundingClientRect();   //  element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport
            
            return {

                top: viewOffset.top + window.pageYOffset,   // pageYOffset property is an alias for the scrollY property; returns the number of pixels that the document has already been scrolled vertically

                left: viewOffset.left + window.pageXOffset

            };

        }
			
	});
	
	
})();


// the width and padding are set in the style tag in the head of the 10_04.html

$("ul li").css("background", "yellow");

$("ul li").width("200px");

$("p").css("background", "violet");

console.log($("p").width());

console.log($("li#lastCat").offset());




