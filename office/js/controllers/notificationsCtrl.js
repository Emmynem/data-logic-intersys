chuks_project.controller('notificationsCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,$window,storage,notify){

  $rootScope.pageTitle = "Notifications";

  $scope.loggedInName = storage.getName();
  $scope.loggedInUserImage = storage.getUserImage();
  $scope.loggedInEmail = storage.getAil();
  $scope.loggedInUsername = storage.getUsername();
  $scope.str_u = storage.get_U_u();
  $scope.result_u = $scope.str_u.substring(4, 14);
  $scope.main_role = storage.getRole();
  $scope.this_year = new Date().getFullYear();

  $scope.doLogout = function () { notify.do_notify($scope.result_u, "Logout Activity", "User logged out successfully."); storage.exit(); };

  $scope.get_notifications = function () {

    $scope.start = 0;
    $scope.numLimit = 5;

    $scope.notifications_data = {
      "user_uuid":$scope.result_u,
      "user_role":$scope.main_role,
      "start":$scope.start,
      "numLimit":$scope.numLimit
    }

    $http.post('server/get_notifications.php', $scope.notifications_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allNotifications = response.data.re_data;
        }
        else if (response.data.noData == 2){
          $scope.allNotifications = "no data";
        }
        else {
          $scope.allNotifications = "error";
        }
      }, function (error) {
        $scope.allNotifications = "error";
      })
  };

  $scope.get_notifications();

  $scope.show_loader = true;

  $scope.remove_loader = function () {

    $timeout(function () {
      $scope.show_loader = undefined;
    }, 2000)

  };

  $scope.numLimit = 50;

  $scope.currentPage = 1;

  $scope.savedCurrentPage = 1;

  $scope.filterShow = false;

  $scope.filter_var = {};

  $scope.filterByDate = function () {
    $scope.filter_var.startdate = new Date();
    $scope.filter_var.startdate.setHours(0, 0, 0, 0);
    $scope.filter_var.enddate = new Date();
    $scope.filter_var.enddate.setHours(23, 59, 59, 999);
    $scope.filterShow = true;
    $scope.currentPage = 1;
  };

  $scope.filter = function (starting_point) {

    if ($scope.filter_var.startdate > $scope.filter_var.enddate) {
      // alert("Error");
      $scope.filterShow = true;
    }
    else {

      $scope.show_loader = true;

      $scope.filterShow = false;

      $scope.start = starting_point;

      $scope.filter_data = {
        "table":"notifications",
        "user_uuid":$scope.result_u,
        "startdate":$scope.filter_var.startdate,
        "enddate":$scope.filter_var.enddate,
        "start":$scope.start,
        "numLimit":$scope.numLimit,
        "user_role":$scope.main_role
      }

      $http.post('server/filter_notifications.php', $scope.filter_data)
        .then(function (response) {
          if (response.data.engineMessage == 1) {
            $scope.all_notifications = response.data.filteredData;
            $scope.totalCount = response.data.totalCount;
            $scope.if_notifications_exists = false;
            $scope.filterShow = false;

            $scope.remove_loader();

            $scope.pages=Math.ceil($scope.totalCount/$scope.numLimit);

            $scope.hideNext=function(){
              if(($scope.start+ $scope.numLimit) < $scope.totalCount){
                return false;
              }
              else
              return true;
            };
            $scope.hidePrev=function(){
              if($scope.start===0){
                return true;
              }
              else
              return false;
            };
            $scope.nextPage=function(){
              $scope.currentPage++;
              $scope.start=$scope.start+ $scope.numLimit;
              $scope.savedCurrentPage = $scope.currentPage;
              $scope.filter($scope.start);
            };
            $scope.PrevPage=function(){
              if($scope.currentPage>1){
                $scope.currentPage--;
                $scope.savedCurrentPage = $scope.currentPage;
              }
              $scope.start=$scope.start - $scope.numLimit;
              $scope.filter($scope.start);
            };
          }
          else if (response.data.noData == 2) {
            $scope.remove_loader();
            $scope.if_notifications_exists = true;
            $scope.filterShow = false;
            $scope.notificationsStatus = "No data in range !";
          }
          else {
            $scope.remove_loader();
            $scope.if_notifications_exists = true;
            $scope.filterShow = false;
            $scope.notificationsStatus = "Couldn't get data !";
          }
        }, function (error) {
          $scope.remove_loader();
          $scope.if_notifications_exists = true;
          $scope.filterShow = false;
          $scope.notificationsStatus = "Somthing's Wrong !";
        })
    }
  };

  $scope.load = function (starting_point) {

    $scope.start = starting_point;

    $scope.show_loader = true;

    $scope.biz_details = {
      "user_uuid":$scope.result_u,
      "start":$scope.start,
      "numLimit":$scope.numLimit,
      "user_role":$scope.main_role
    }

    $http.post("server/get_notifications.php", $scope.biz_details)
    .then(function (response) {
      if (response.data.engineMessage == 1) {
        $scope.all_notifications = response.data.re_data;
        $scope.totalCount = response.data.totalCount;
        $scope.if_notifications_exists = false;

        $scope.remove_loader();

        $scope.pages=Math.ceil($scope.totalCount/$scope.numLimit);

        $scope.hideNext=function(){
          if(($scope.start+ $scope.numLimit) < $scope.totalCount){
            return false;
          }
          else
          return true;
        };
        $scope.hidePrev=function(){
          if($scope.start===0){
            return true;
          }
          else
          return false;
        };
        $scope.nextPage=function(){
          $scope.currentPage++;
          $scope.start=$scope.start+ $scope.numLimit;
          $scope.savedCurrentPage = $scope.currentPage;
          $scope.load($scope.start);
        };
        $scope.PrevPage=function(){
          if($scope.currentPage>1){
            $scope.currentPage--;
            $scope.savedCurrentPage = $scope.currentPage;
          }
          $scope.start=$scope.start - $scope.numLimit;
          $scope.load($scope.start);
        };
      }
      else if (response.data.noNotifications == 2) {
        $scope.remove_loader();
        $scope.if_notifications_exists = true;
        $scope.notificationsStatus = "No notifications !";
      }
      else {
        $scope.remove_loader();
        $scope.if_notifications_exists = true;
        $scope.notificationsStatus = "Couldn't fetch notifications !";
      }
    }, function (error) {
      $scope.remove_loader();
      $scope.if_notifications_exists = true;
      $scope.notificationsStatus = "Something's Wrong !";
    })

  };

  $scope.load(0);

});
