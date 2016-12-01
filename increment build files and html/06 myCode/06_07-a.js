var Person = function(name) {
	
	this.name = name;
	
};

var person = new Person("John");

INSTANCEOF(person, Person); // person instanceof Person; returns a boolean


function INSTANCEOF(obj, constr) {
	
	if (Object.getPrototypeOf(obj).constructor === constr) {		// or Object.getPrototypeOf(obj) === constr.prototype
	
		return true;
		
	}
	else if (Object.getPrototypeOf(obj) === null) {
		
		return false;	
		
	}
	else {
		
		return INSTANCEOF(Object.getPrototypeOf(obj), constr);
		
	}
	
}


//same, but with deprecated __proto__
/*

function INSTANCEOF(obj, constr) {
	
	if (obj.__proto__ === null) {
		
		return false;	
		
	}
	
	
	if (obj.__proto__.constructor === constr) {
		
		return true;
		
	}
	else {
		
		return INSTANCEOF(obj.__proto__, constr);
		
	}
	
}

*/