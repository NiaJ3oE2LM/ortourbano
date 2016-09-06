angular.module('starter', ['ngRoute'])
.config(function($routeProvider){
    $routeProvider
      .when('/main',{
        templateUrl:'/app/main',
        controller:'mainCtrl'
      })
      .when('/about',{
        templateUrl:'/app/about'
        //controller controllerAS
      })
      .when('/contact',{
        templateUrl:'/app/contact'
        //controller controllerAS
      })
      .otherwise('/about');
})
