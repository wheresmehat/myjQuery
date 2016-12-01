var Person = function(name) {
	
	this.name = name;
	
};

Person.prototype.speak = function() {
	
	console.log("Hello! " + this.name);
	
};

Person.prototype.sum = function(par1, par2) {
	
	console.log(par1 + par2);
	
};

Person.prototype.roll = function(par1, par2) {
	
	console.log(par1, par2);
	
};


var person = new Person("Smith");

DOTCALL(person, "speak", []);	// obj, propertyName, args; person.speak([])

DOTCALL(person, "sum", [12, 10]);

DOTCALL(person, "roll", ["Rick", "Rolled"]);


function DOT(obj, prop) {
	
	if (obj.hasOwnProperty(prop)) {
		
		return obj[prop];
		
	}
	else if (Object.getPrototypeOf(obj)) {	
		
		return DOT(Object.getPrototypeOf(obj), prop);	
		
	}
	
}


function DOTCALL(obj, meth, args) {
	
	var func = DOT(obj, meth);	// save function in variable, so we only call DOT once; if it doesn't exist func will be undefined
	
	if (func) {		// check if method exists on object
		
		return func.apply(obj, args);		
		
	}
	
}



/*
function DOTCALL(obj, meth, args) {
	
	if (DOT(obj, meth)) {		// check if method exists on function
		
		return DOT(obj, meth).apply(obj, args);		
		
	}
	
}
*/
