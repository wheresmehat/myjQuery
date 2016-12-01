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
            else {              // if we call attr with too many or no arguments at all

                return this;

            }	                   
			
		}

			
	});
	
	
})();



$("p").attr("class", "myPara").text("Wow, it's chainable");

console.log($("li#lastCat").attr("id"));
