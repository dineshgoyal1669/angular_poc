angular.module('cart')
.service('ItemListService',['$http',function($http){
	this.getItems=function(){
		return $http({
		method: 'GET',
		url: 'data/items.json'
	})
	};
}]);