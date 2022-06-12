chuks_project_signup.controller('mainCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,$window){

  $rootScope.pageTitle = "Data-Logic Intersys";

  $scope.this_year = new Date().getFullYear();

  $scope.time;

  $scope.hr = new Date().getHours();
  $scope.min = new Date().getMinutes();
  $scope.sec = new Date().getSeconds();
  $scope.time = $scope.hr + ":" + $scope.min;

  $scope.todays_date = new Date();

});
