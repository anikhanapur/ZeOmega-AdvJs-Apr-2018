var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'},
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Initial list', function(){
	console.table(products);
});

describe('sort', function(){
	describe('default sort [products by id]', function(){
		function sort(){
			//...
		}
		sort()
		console.table(products);
	});

	describe('Any list by any attribute', function(){
		function sort(/*....*/){
			//...
		}
		describe('Products by cost', function(){
			sort();
			console.table(products);
		});

		describe('Products by units', function(){
			sort();
			console.table(products);
		});
	});
});

describe('filter', function(){
	describe('default filter [costly products (cost > 50)]', function(){
		//filter();
		console.table(products);
	});
});

