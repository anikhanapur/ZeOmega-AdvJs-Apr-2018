
/*
//Creating spinner as a singleton
var spinner = (function (){
	var counter = 0;

	function increment(){
		return ++counter;
	}

	function decrement(){
		return --counter;
	}

	return {
		up : increment,
		down : decrement
	}
})();

*/

//Creating spinner as a factory so that multiple instances can be created as needed
/*function spinnerFactory(){
	var counter = 0;

	function increment(){
		return ++counter;
	}

	function decrement(){
		return --counter;
	}

	return {
		up : increment,
		down : decrement
	}
}*/

function spinnerFactory(){
	var counter = 0;
	return {
		up : function(){
			return ++counter;
		},
		down : function(){
			return --counter;
		}
	};
}

var spinner = spinnerFactory();

