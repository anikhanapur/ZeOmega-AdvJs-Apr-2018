
var isPrime = (function(){
	var cache = {};

	return function (n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];

		console.log('processing ', n);
		cache[n] = true;
		for(var index = 2; index <= (n/2); index++)
			if (n % index === 0){
				cache[n] = false;
				break;
			}
		return cache[n];
	}
})();


var isOddOrEven = (function(){
	var cache = {};

	return function (n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];

		console.log('processing ', n);
		cache[n] = n % 2 === 0 ? 'even' : 'odd';
		return cache[n];
	}
})();


function memoize(algo){
	var cache = {};

	return function (n){
		if (typeof cache[n] === 'undefined')
			cache[n] = algo(n);
		return cache[n];
	}
}

function memoize(algo){
	var cache = {};

	return function (){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = algo.apply(null, arguments);
		return cache[key];
	}
}









