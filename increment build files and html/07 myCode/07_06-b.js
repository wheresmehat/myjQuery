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


function logHelper() {
	
	var counter = 1;
	
	function lg(output) {
		
		console.log(counter + ".");
		console.log(output + "\n");
	
		counter++;	
		
	}
	
	return lg;
	
}

var lg = logHelper();

lg($.isArray([]));		// true

function test1(arg1) {
	
	return $.isArray(arguments);	
	
}

lg(test1("something"));		// false

var iframe = document.createElement("iframe");
document.body.appendChild(iframe);

var _Array = iframe.contentWindow.Array;

lg($.isArray(new _Array()));	// true


