// forEach loop

var make = {};

var elements = ["a", "div", "span", "form", "h1", "h2", "h3", "h4"];


elements.forEach(function(val) {
	
	make[val] = function() {
		
		return document.createElement(val);
	};
		
});


var a = make.a();

a.innerHTML = "link";

document.body.appendChild(a);


var h1 = make.h1();

h1.innerHTML = "heading1";

document.body.appendChild(h1);


var span = make.span();

span.innerHTML = "span";

document.body.appendChild(span);