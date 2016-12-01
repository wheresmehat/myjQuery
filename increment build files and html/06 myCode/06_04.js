var Person = function(name) {
	
	this.name = name;
	
};

Person.prototype.speak = function() {
	
	console.log("Hello, I'm " + this.name);
	
};


var person = NEW(Person, ["John"]);		// NEW(constructor, [arguments]); new Person("John") 
person.speak();


function NEW(constr, args) {
	
	var obj = Object.create(constr.prototype);
	
	constr.apply(obj, args);
	
	return obj;
	
}



/* Object.setPrototypeOf() is in the latest ECMAScript 6 standard draft. It is generally considered the proper way to set the prototype of an object */
/*
function NEW(constr, args) {
	
	var obj = {};
	
	Object.setPrototypeOf(obj, constr.prototype);
	
	constr.apply(obj, args);
	
	return obj;
	
}
*/

// old way with dunder proto (__proto__)
/*
function NEW(constr, args) {
	
	var obj = {};
	
	obj.__proto__ = constr.prototype;
	
	constr.apply(obj, args);
	
	return obj;
	
}
*/