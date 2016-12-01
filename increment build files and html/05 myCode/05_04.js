var Person = function(name) {
	
	this.name = name;
	
};

Person.prototype.isPerson = true;

var person = new Person("Smith");


DOT(person, "name");		// person.name
DOT(person, "isPerson");	// person.isPerson


function DOT(obj, prop) {
	
	if (obj.hasOwnProperty(prop)) {
		
		return obj[prop];
		
	}
	else if (Object.getPrototypeOf(obj)) {	// check if we have reached null on the proto chain; that means there isn't a property on the chain and the function exits the conditional and returns undefined (function that doesn't return anything returns undefined)
		
		return DOT(Object.getPrototypeOf(obj), prop);	// we could also use obj["__proto__"] 
		
	}
	
}