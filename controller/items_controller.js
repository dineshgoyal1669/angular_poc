angular.module('cart')
.controller('ItemsController',['$scope','ItemListService','CouponListService',function($scope,ItemListService,CouponListService){
	$scope.filters = {};
	$scope.items = '';
	$scope.coupons = [];
	$scope.favourites = [];
	$scope.cart = [];
	$scope.total_cost = 0;
	$scope.coupon_code = '';
	$scope.discount = 0;
	$scope.payable_amount = 0;
	ItemListService.getItems().then(function successCallback(response){
		$scope.items = response.data;
	});
	CouponListService.getCoupons().then(function successCallback(response){
		$scope.coupons = response.data;
		console.log($scope.coupons);
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
			$scope.cart[$scope.cart.indexOf(item)].count = item.count;
			if(item.count == 0){
				var index = $scope.cart.indexOf(item);
				if(index != -1){
  					$scope.cart.splice(index, 1); 
  				}
			}
		}
		$scope.calculateCost();
	}
	$scope.incrementCount = function(item){
		item.count = Number(item.count)+1;
		if($scope.cart.indexOf(item)==-1){
			$scope.cart.push(item);
		}else{
			$scope.cart[$scope.cart.indexOf(item)].count = item.count;
		}
		$scope.calculateCost();
	}
	$scope.calculateCost = function(){
		$scope.total_cost = 0;
		for (i = 0; i < $scope.cart.length; i++) { 
			$scope.total_cost += $scope.cart[i].count * $scope.cart[i].cost;
		}
		$scope.payable_amount = $scope.total_cost - ($scope.total_cost * $scope.discount /100);
	}
	$scope.applyCode = function(){
		$scope.discount = 0;
		for (i = 0; i < $scope.coupons.length; i++) { 
			if($scope.coupons[i].code == $scope.coupon_code){
				$scope.discount = $scope.coupons[i].discount;
			}
		}
		$scope.calculateCost();
	}
	$scope.updateCartItems = function(item){
		if($scope.cart.indexOf(item)==-1){
			$scope.cart.push(item);
		}
		if(item.count == 0 || item.count == ''){
			var index = $scope.cart.indexOf(item);
			if(index != -1){
  				$scope.cart.splice(index, 1); 
  			}

		}
		$scope.calculateCost();
	}
}]);