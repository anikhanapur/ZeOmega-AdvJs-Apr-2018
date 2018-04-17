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

function printGroup(groupedObj){
	for(var key in groupedObj){
		describe('Key - [' + key + ']', function(){
			console.table(groupedObj[key]);
		});
	}
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
	function getDescending(comparer){
		return function(){
			return comparer.apply(null, arguments) * -1;
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
		var productComparerByValue = function(p1, p2){
			var p1Value = p1.cost * p1.units,
				p2Value = p2.cost * p2.units;
			if (p1Value < p2Value) return -1;
			if (p1Value === p2Value) return 0;
			return 1;
		};

		describe('Products by value [cost * units]', function(){
			sort(products, productComparerByValue);
			console.table(products);
		});
		describe('Products by value [cost * units] in descending', function(){
			var productComparerByValueDesc = getDescending(productComparerByValue);
			sort(products, productComparerByValueDesc);
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
		function filter(list, criteriaFn){
			var result = [];
			for(var index =0, count = list.length; index < count; index++){
				if (criteriaFn(list[index]))
					result.push(list[index]);
			}
			return result;
		}

		function negate(criteria){
			return function(){
				return !criteria.apply(null, arguments);
			}
		}
		describe('all stationary products', function(){
			var stationaryProductCriteria = function(product){
				return product.category === 'stationary';
			};
			var stationaryProducts = filter(products, stationaryProductCriteria);
			console.table(stationaryProducts);
		});

		describe('Products by stock', function(){
			var understockedProductCriteria = function(product){
				return product.units < 50;
			};
			describe('all understocked products [units < 50]', function(){
				var understockedProducts = filter(products, understockedProductCriteria);
				console.table(understockedProducts);
			});
			describe('all wellstocked products [units >= 50]', function(){
				/*var wellStockedProductCritera = function(product){
					return product.units >= 50;
				};*/
				/*var wellStockedProductCritera = function(product){
					return !understockedProductCriteria(product);
				};*/
				var wellStockedProductCritera = negate(understockedProductCriteria);
				var wellStockedProducts = filter(products, wellStockedProductCritera);
				console.table(wellStockedProducts);
			})
		});

		describe('Products by cost', function(){
			var costlyProductCriteria = function(product){
				return product.cost > 60;
			};
			describe('all costly products [cost > 50]', function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});
			describe('all affordable products [cost <= 50]', function(){
				/*var affordableProductCriteria = function(product){
					return product.cost <= 50;
				};*/
				/*var affordableProductCriteria = function(product){
					return !costlyProductCriteria(product);
				};*/
				var affordableProductCriteria = negate(costlyProductCriteria);
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});
		});
	})
});

describe('groupBy', function(){
	describe('Products by category', function(){
		function groupProductsByCategory(){
			var result = {};
			for(var index = 0, count = products.length; index < count; index++){
				var key = products[index].category;
				if (typeof result[key] === 'undefined')
					result[key] = [];
				result[key].push(products[index]);
			}
			return result;
		}

		var productsByCategory = groupProductsByCategory();
		printGroup(productsByCategory);
	});
	describe('any list  by any key', function(){
		function groupBy(list, keySelector){
			var result = {};
			for(var index = 0, count = list.length; index < count; index++){
				var key = keySelector(list[index]);
				if (typeof result[key] === 'undefined')
					result[key] = [];
				result[key].push(list[index]);
			}
			return result;
		}

		describe('products by cost', function(){
			var costKeySelector = function(product){
				return product.cost > 50 ? 'costly' : 'affordable';
			};
			var productsByCost = groupBy(products, costKeySelector);
			printGroup(productsByCost);
		});
	});
});























