angular.module('cart')
.controller('ItemsController',['$scope','ItemListService',function($scope,ItemListService){
	$scope.filters = {};
	$scope.items = '';
	$scope.favourites = [];
	$scope.cart = [];
	$scope.total_cost = 0;
	ItemListService.getItems().then(function successCallback(response){
		$scope.items = response.data;
	});
	$scope.getFavourites = function(){
		return $scope.favourites;
	}
	$scope.setFavourites = function(item){
		$scope.favourites.push(item.id);
		item.showAdd = true;
		item.showRemove = true;
		console.log($scope.favourites);
	}
	$scope.removeFavourites = function(item){
		var index = $scope.favourites.indexOf(item.id);
  		$scope.favourites.splice(index, 1); 
  		item.showAdd = false;
		item.showRemove = false;
  		console.log($scope.favourites);
	}
	$scope.favouriteItemAdded = function(item){
		if($scope.favourites.indexOf(item.id)!=-1){
			return true;
		}else{
			return false;
		}
	}
	$scope.decrementCount = function(item){
		if(item.count != 0){
			item.count = Number(item.count)-1;
			if($scope.cart.indexOf(item)==-1){
				$scope.cart.push(item);
			}else{
				$scope.cart[$scope.cart.indexOf(item)].count = item.count;
			}
		}else{
			var index = $scope.cart.indexOf(item);
  			$scope.cart.splice(index, 1); 
		}
		calculateCost();
	}
	$scope.incrementCount = function(item){
		item.count = Number(item.count)+1;
		console.log(item.count);
		if($scope.cart.indexOf(item)==-1){
			$scope.cart.push(item);
		}else{
			$scope.cart[$scope.cart.indexOf(item)].count = item.count;
		}
		calculateCost();
	}
	var calculateCost = function(){
		$scope.total_cost = 0;
		for (i = 0; i < $scope.cart.length; i++) { 
			console.log($scope.cart[i]);
			$scope.total_cost += $scope.cart[i].count * $scope.cart[i].cost;
		}
	}	

}]);