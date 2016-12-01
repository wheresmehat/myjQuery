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
	
	
	$.extend($, {
		
		isArray: function(obj) {
			
			return Object.prototype.toString.call(obj) === "[object Array]";
			
		}
		
	});
	
	
})();


console.log($.isArray([]));		// true

function test1(arg1) {
	
	return $.isArray(arguments);	
	
}

console.log(test1("something"));		// false

var iframe = document.createElement("iframe");
document.body.appendChild(iframe);

var _Array = iframe.contentWindow.Array;

console.log($.isArray(new _Array()));	// true


