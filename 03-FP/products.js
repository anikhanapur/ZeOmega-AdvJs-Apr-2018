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
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});

	function sort(list, comparer){
		var comparerFn = function(){};
		if (typeof comparer === 'function')
			comparerFn = comparer;
		if (typeof comparer === 'string'){
			comparerFn = function(p1, p2){
				if (p1[comparer] < p2[comparer]) return -1;
				if (p1[comparer] > p2[comparer]) return 1;
				return 0;
			};
		}
		for(var i=0; i < list.length-1; i++)
			for(var j=i+1; j < list.length; j++){
				var compareResult = comparerFn(list[i], list[j]);
				if (compareResult > 0){
					var temp = list[i];
					list[i] = list[j];
					list[j] = temp;
				}
			}
	}
	describe('Any list by any attribute', function(){
		/*function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});

		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});

	describe('Any list by any comparer', function(){
		/*function sort(list, comparerFn){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++){
					var compareResult = comparerFn(list[i], list[j]);
					if (compareResult > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}*/
		describe('Products by value [cost * units]', function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			}
			sort(products, productComparerByValue);
			console.table(products);
		})
	})
});

describe('filter', function(){
	describe('default filter [costly products (cost > 50)]', function(){
		function filterCostlyProducts(){
			var result = [];
			for(var index =0, count = products.length; index < count; index++){
				if (products[index].cost > 50)
					result.push(products[index]);
			}
			return result;
		}
		var costlyProducts = filterCostlyProducts();
		console.table(costlyProducts);
	});
	describe('any list by any criteria', function(){
		function filter(/*...*/){

		}
		describe('all stationary products', function(){

		});
		describe('all understocked products [units < 50]', function(){

		});
		describe('all costly products [cost > 50]', function(){
			
		})
	})
});

