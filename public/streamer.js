var streamer = angular.module('streamer',['ngRoute']);

streamer.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl : 'partials/login.html',
			controller : 'loginCtrl'
		})
		.when('/home',{
			templateUrl : 'partials/home.html',
			controller : 'homeCtrl'	
		})
});

streamer.controller('loginCtrl',function($scope) {

});

streamer.controller('homeCtrl',function($scope) {
	
});