angular.module('cart')
.controller('ItemsController',['$scope','ItemListService',function($scope,ItemListService){
	$scope.filters = {};
	$scope.items = '';
	$scope.favourites = [];
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

}]);