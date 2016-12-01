var Person = function(name) {
	
	this.name = name;
	
};

var person = new Person("John");

INSTANCEOF(person, Person); // person instanceof Person; returns a boolean


function INSTANCEOF(obj, constr) {
	
	if (Object.getPrototypeOf(obj) === constr.prototype) {	
	
		return true;
		
	}
	else if (Object.getPrototypeOf(obj)) {
		
		return INSTANCEOF(Object.getPrototypeOf(obj), constr);	
		
	}
	else {
		
		return false;
		
	}
	
}

