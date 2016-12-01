// for loop; using closure with IIFE

var make = {};

var elements = ["a", "div", "span", "form", "h1", "h2", "h3", "h4"];


for (var i = 0; i < elements.length; i++) {
	
	(function outer(j) {
		
		make[elements[j]] = function() {
		
			return document.createElement(elements[j]);
		};
		
	})(i);	
		
}

var a = make.a();

a.innerHTML = "link";

document.body.appendChild(a);

var h1 = make.h1();

h1.innerHTML = "heading1";

document.body.appendChild(h1);


// a little different passing elements[i] to IIFE
/*

var make = {};

var elements = ["a", "div", "span", "form", "h1", "h2", "h3", "h4"];


for (var i = 0; i < elements.length; i++) {
	
	(function outer(tag) {
		
		make[tag] = function() {
		
			return document.createElement(tag);
		};
		
	})(elements[i]);	
		
}

var a = make.a();

a.innerHTML = "link";

document.body.appendChild(a);

var h1 = make.h1();

h1.innerHTML = "heading1";

document.body.appendChild(h1);

*/