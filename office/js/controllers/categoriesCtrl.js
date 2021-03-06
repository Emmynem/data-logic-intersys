chuks_project.controller('categoriesCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,$window,storage,notify,strip_text){

  $rootScope.pageTitle = "Categories";

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

  $scope.filterShow = false;

  $scope.filter_var = {};

  $scope.filterByDate = function () {
    $scope.filter_var.startdate = new Date();
    $scope.filter_var.startdate.setHours(0, 0, 0, 0);
    $scope.filter_var.enddate = new Date();
    $scope.filter_var.enddate.setHours(23, 59, 59, 999);
    $scope.filterShow = true;
  };

  $scope.filter = function () {

    if ($scope.filter_var.startdate > $scope.filter_var.enddate) {
      $scope.filterShow = true;
    }
    else {

      $scope.filterShow = false;

      $scope.show_loader = true;

      $scope.filter_data = {
        "table":"categories",
        "startdate":$scope.filter_var.startdate,
        "enddate":$scope.filter_var.enddate
      }

      $http.post('server/filter_category.php', $scope.filter_data)
        .then(function (response) {
          if (response.data.engineMessage == 1) {
            $scope.allCategoriesStatus = undefined;
            $scope.allCategories = response.data.filteredData;

            $scope.remove_loader();

            $scope.currentPage=1;
            $scope.numLimit=20;
            $scope.start = 0;
            $scope.$watch('allCategories',function(newVal){
              if(newVal){
               $scope.pages=Math.ceil($scope.allCategories.length/$scope.numLimit);

              }
            });
            $scope.hideNext=function(){
              if(($scope.start+ $scope.numLimit) < $scope.allCategories.length){
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
            };
            $scope.PrevPage=function(){
              if($scope.currentPage>1){
                $scope.currentPage--;
              }
              $scope.start=$scope.start - $scope.numLimit;
            };
          }
          else if (response.data.noData == 2) {
            $scope.allCategoriesStatus = "No data in range !";
            // $timeout(function () {
            //   $scope.allCategoriesStatus = undefined;
            // }, 3000)
          }
          else {
            $scope.allCategoriesStatus = "Couldn't get data";
            // $timeout(function () {
            //   $scope.allCategoriesStatus = undefined;
            // }, 3000)
          }
        }, function (error) {
          $scope.allCategoriesStatus = "Something's Wrong";
          // $timeout(function () {
          //   $scope.allCategoriesStatus = undefined;
          // }, 3000)
        })
    }
  };

  $scope.category = {};

  // $scope.addCategory = function () {
  //   modalOpen('addCategoryModal', 'medium');
  //   $scope.shouldIShow = false;
  // };
  //
  // $scope.removeAddCategoryModal = function () {
  //   modalClose('addCategoryModal');
  // };

  $scope.saveCategory = function () {

    $scope.shouldIShow = true;

    $scope.continue_action = function () {

      $scope.clickOnce = true;

      $scope.categoryData = {
        "user_uuid":$scope.result_u,
        "edit_user_uuid":$scope.result_u,
        "category":$scope.category.name,
        "stripped":strip_text.get_stripped($scope.category.name),
      }

      $http.post('server/add_category.php', $scope.categoryData)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.showSuccessStatus = "Category created !";
          notify.do_notify($scope.result_u, "Add Activity", "Category created");
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
            $rootScope.imageStatus = undefined;
            // $route.reload();
            window.location.reload(true);
          }, 3000)
        }
        else if (response.data.alreadyExists == 2){
            $scope.showStatus = "Category Already Exists";
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
            $scope.clickOnce = false;
          }, 3000)
        }
        else {
          $scope.showStatus = "Error Occured";
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
            $scope.clickOnce = false;
          }, 3000)
        }
      }, function (error) {
        $scope.showStatus = "Something's Wrong";
        $timeout(function () {
          $scope.showStatus = undefined;
          $scope.showSuccessStatus = undefined;
          $scope.clickOnce = false;
        }, 3000)
      })

    };

    $scope.removeConfirmModal = function () {

      $scope.shouldIShow = undefined;

    };

  };

  $scope.edit_category = function (uuid, category) {

    $scope.category.edit_name = category;

    $scope.go_ahead = function () {
      $scope.shouldIShow = true;
    };

    $scope.continue_action = function () {

      $scope.clickOnce = true;

      $scope.categoryData = {
        "edit_user_uuid":$scope.result_u,
        "uuid":uuid,
        "category":$scope.category.edit_name,
        "stripped":strip_text.get_stripped($scope.category.edit_name),
      }

      $http.post('server/edit_category.php', $scope.categoryData)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.showSuccessStatus = "Category edited !";
          notify.do_notify($scope.result_u, "Edit Activity", "Category edited");
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
            $rootScope.imageStatus = undefined;
            // $route.reload();
            window.location.reload(true);
          }, 3000)
        }
        else if (response.data.alreadyExists == 2){
          $scope.showStatus = "Category Already Exists";
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
            $scope.clickOnce = false;
          }, 3000)
        }
        else {
          $scope.showStatus = "Error Occured";
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
            $scope.clickOnce = false;
          }, 3000)
        }
      }, function (error) {
        $scope.showStatus = "Something's Wrong";
        $timeout(function () {
          $scope.showStatus = undefined;
          $scope.showSuccessStatus = undefined;
          $scope.clickOnce = false;
        }, 3000)
      })

    };

    $scope.removeConfirmModal = function () {

      $scope.shouldIShow = undefined;

    };
  }

  $scope.loadCategories = function () {

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('allCategories',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.allCategories.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.allCategories.length){
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
          };
          $scope.PrevPage=function(){
            if($scope.currentPage>1){
              $scope.currentPage--;
            }
            $scope.start=$scope.start - $scope.numLimit;
          };
        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.allCategoriesStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.allCategoriesStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.allCategoriesStatus = undefined;
        // }, 3000)
      })

  };

  $scope.loadCategories();

  $scope.loadHistory = function (uuid) {

    $scope.historyData = {
      "category":uuid
    }

    $http.post('server/get_history.php', $scope.historyData)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.historyStatus = undefined;
          $scope.history = response.data.re_data;
        }
        else if (response.data.noData == 2) {
          $scope.historyStatus = "No history found on category !";
          // $timeout(function () {
          //   $scope.historyStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.historyStatus = "Error Occured";
          // $timeout(function () {
          //   $scope.historyStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.historyStatus = "Something's Wrong";
        // $timeout(function () {
        //   $scope.historyStatus = undefined;
        // }, 3000)
      })

  };

  $scope.show_category = function (stripped) {
    window.open($location.protocol() + "://" + $location.host() + ":" + $location.port() + "/chuks_project/" + stripped);
    // window.open("https://datalogic.toonlogicstudio.com/" + stripped);
  };

});
