angular.module('cart')
.service('CouponListService',['$http',function($http){
	this.getCoupons=function(){
		return $http({
		method: 'GET',
		url: 'data/coupons.json'
	})
	};
}]);