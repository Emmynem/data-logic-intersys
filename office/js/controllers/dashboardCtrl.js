chuks_project.controller('dashboardCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,storage,notify,ngClipboard){

  $scope.loggedInName = storage.getName();
  $scope.loggedInUserImage = storage.getUserImage();
  $scope.loggedInEmail = storage.getAil();
  $scope.loggedInUsername = storage.getUsername();
  $scope.str_u = storage.get_U_u();
  $scope.result_u = $scope.str_u.substring(4, 14);
  $scope.main_role = storage.getRole();
  $scope.this_year = new Date().getFullYear();
  $scope.doLogout = function () { notify.do_notify($scope.result_u, "Logout Activity", "User logged out successfully."); storage.exit(); };

  $rootScope.pageTitle = "Dashboard";

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

  $scope.remove_loader();

  $http.post('server/get_count.php')
    .then(function (response) {
      if (response.data.engineMessage == 1) {

        $scope.totalCategoryViewsCount = response.data.totalCategoryViewsCount;
        $scope.totalPeopleCount = response.data.totalPeopleCount;
        $scope.totalUsersCount = response.data.totalUsersCount;
        $scope.totalCheckersCount = response.data.totalCheckersCount;
        $scope.totalCategoryCount = response.data.totalCategoryCount;
        $scope.totalIncomeCount = response.data.totalIncomeCount != null ? response.data.totalIncomeCount : 0;
        $scope.totalExpenseCount = response.data.totalExpenseCount != null ? response.data.totalExpenseCount : 0;
        $scope.balanceCount = $scope.totalIncomeCount - $scope.totalExpenseCount;

        // $scope.rawAllEventNames = response.data.allEventNames;
        // $scope.newArr = [];
        // angular.forEach($scope.rawAllEventNames, function(item, index) {
        //     $scope.newArr.push(item[0]);
        // });
        //
        // $scope.allEventNames = [...new Set($scope.newArr)];

        // $scope.totalEventCount = $scope.allEventNames.length;
      }
      else {
        $scope.dashboardStatus = "Couldn't Fetch records !";
      }
    }, function (error) {
      $scope.dashboardStatus = "An Error Occured !";
    })

});
