chuks_project.controller('everyoneCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,$window,storage,notify,history,cncf_nations,cncf_states,cncf_areas,cncf_zones,cncf_choirs){

  $rootScope.pageTitle = "Everyone";

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

  $scope.filterCategoryShow = false;

  $scope.filterNationShow = false;

  $scope.filterStateShow = false;

  $scope.filterAreaShow = false;

  $scope.filterZoneShow = false;

  $scope.filterChoirShow = false;

  $scope.filterPartShow = false;

  $scope.filterAllShow = false;

  $scope.unauthenticateShow = false;

  $scope.filter_var = {};

  $scope.filter_category_var = {};

  $scope.filter_nation_var = {};

  $scope.filter_state_var = {};

  $scope.filter_area_var = {};

  $scope.filter_zone_var = {};

  $scope.filter_choir_var = {};

  $scope.filter_part_var = {};

  $scope.filter_all_var = {};

  $scope.unauthenticate_var = {};

  $scope.filterByDate = function () {
    $scope.filter_var.startdate = new Date();
    $scope.filter_var.startdate.setHours(0, 0, 0, 0);
    $scope.filter_var.enddate = new Date();
    $scope.filter_var.enddate.setHours(23, 59, 59, 999);
    $scope.filterShow = true;
  };

  $scope.filterByCategory = function () {
    $scope.filterCategoryShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filterByNation = function () {
    $scope.filterNationShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
          $scope.nations = cncf_nations.nations();
        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filterByState = function () {
    $scope.filterStateShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
          $scope.nations = cncf_nations.nations();

          $scope.change_state = function (obj) {

            $scope.states = undefined;

            $scope.statesList = cncf_states.states();

            angular.forEach($scope.statesList, function (value, key) {
              if (key == obj) {
                $scope.states = value;
              }
            })

          };

        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filterByArea = function () {
    $scope.filterAreaShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
          $scope.nations = cncf_nations.nations();

          $scope.change_state = function (obj) {

            $scope.states = undefined;

            $scope.statesList = cncf_states.states();

            angular.forEach($scope.statesList, function (value, key) {
              if (key == obj) {
                $scope.states = value;
              }
            })

          };

          $scope.change_area = function (obj) {

            $scope.areas = undefined;

            $scope.areasList = cncf_areas.areas();

            angular.forEach($scope.areasList, function (value, key) {
              if (key == obj) {
                $scope.areas = value;
              }
            })

          };

        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filterByZone = function () {
    $scope.filterZoneShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
          $scope.nations = cncf_nations.nations();

          $scope.change_state = function (obj) {

            $scope.states = undefined;

            $scope.statesList = cncf_states.states();

            angular.forEach($scope.statesList, function (value, key) {
              if (key == obj) {
                $scope.states = value;
              }
            })

          };

          $scope.change_area = function (obj) {

            $scope.areas = undefined;

            $scope.areasList = cncf_areas.areas();

            angular.forEach($scope.areasList, function (value, key) {
              if (key == obj) {
                $scope.areas = value;
              }
            })

          };

          $scope.change_zone = function (obj) {

            $scope.zones = undefined;

            $scope.zonesList = cncf_zones.zones();

            angular.forEach($scope.zonesList, function (value, key) {
              if (key == obj) {
                $scope.zones = value;
              }
            })

          };

        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filterByChoir = function () {
    $scope.filterChoirShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
          $scope.nations = cncf_nations.nations();

          $scope.change_state = function (obj) {

            $scope.states = undefined;

            $scope.statesList = cncf_states.states();

            angular.forEach($scope.statesList, function (value, key) {
              if (key == obj) {
                $scope.states = value;
              }
            })

          };

          $scope.change_area = function (obj) {

            $scope.areas = undefined;

            $scope.areasList = cncf_areas.areas();

            angular.forEach($scope.areasList, function (value, key) {
              if (key == obj) {
                $scope.areas = value;
              }
            })

          };

          $scope.change_zone = function (obj) {

            $scope.zones = undefined;

            $scope.zonesList = cncf_zones.zones();

            angular.forEach($scope.zonesList, function (value, key) {
              if (key == obj) {
                $scope.zones = value;
              }
            })

          };

          $scope.change_choir = function (obj) {

            $scope.choirs = undefined;

            $scope.choirsList = cncf_choirs.choirs();

            angular.forEach($scope.choirsList, function (value, key) {
              if (key == obj) {
                $scope.choirs = value;
              }
            })

          };

        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filterByPart = function () {
    $scope.filterPartShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filterByAll = function () {
    $scope.filterAllShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
          $scope.nations = cncf_nations.nations();

          $scope.change_state = function (obj) {

            $scope.states = undefined;

            $scope.statesList = cncf_states.states();

            angular.forEach($scope.statesList, function (value, key) {
              if (key == obj) {
                $scope.states = value;
              }
            })

          };

          $scope.change_area = function (obj) {

            $scope.areas = undefined;

            $scope.areasList = cncf_areas.areas();

            angular.forEach($scope.areasList, function (value, key) {
              if (key == obj) {
                $scope.areas = value;
              }
            })

          };

          $scope.change_zone = function (obj) {

            $scope.zones = undefined;

            $scope.zonesList = cncf_zones.zones();

            angular.forEach($scope.zonesList, function (value, key) {
              if (key == obj) {
                $scope.zones = value;
              }
            })

          };

          $scope.change_choir = function (obj) {

            $scope.choirs = undefined;

            $scope.choirsList = cncf_choirs.choirs();

            angular.forEach($scope.choirsList, function (value, key) {
              if (key == obj) {
                $scope.choirs = value;
              }
            })

          };

        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.unauthenticate = function () {
    $scope.unauthenticateShow = true;

    $http.get('server/get_categories.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.allCategoriesStatus = undefined;
          $scope.allCategories = response.data.re_data;
        }
        else if (response.data.noData == 2) {
          $scope.allCategoriesStatus = "No categories found !";
        }
        else {
          $scope.allCategoriesStatus = "Error Occured";
        }
      }, function (error) {
        $scope.allCategoriesStatus = "Something's Wrong";
      })
  };

  $scope.filter = function () {

    if ($scope.filter_var.startdate > $scope.filter_var.enddate) {
      $scope.filterShow = true;
    }
    else {
      $scope.show_loader = true;

      $scope.filterShow = false;

      $scope.filter_data = {
        "table":"people",
        "startdate":$scope.filter_var.startdate,
        "enddate":$scope.filter_var.enddate
      }

      $http.post('server/filter_everyone.php', $scope.filter_data)
        .then(function (response) {
          if (response.data.engineMessage == 1) {
            $scope.everyoneStatus = undefined;
            $scope.everyone = response.data.filteredData;

            $scope.remove_loader();

            $scope.currentPage=1;
            $scope.numLimit=20;
            $scope.start = 0;
            $scope.$watch('everyone',function(newVal){
              if(newVal){
               $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

              }
            });
            $scope.hideNext=function(){
              if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
            $scope.everyoneStatus = "No data in range !";
            $scope.remove_loader();
            // $timeout(function () {
            //   $scope.everyoneStatus = undefined;
            // }, 3000)
          }
          else {
            $scope.everyoneStatus = "Couldn't get data";
            $scope.remove_loader();
            // $timeout(function () {
            //   $scope.everyoneStatus = undefined;
            // }, 3000)
          }
        }, function (error) {
          $scope.everyoneStatus = "Something's Wrong";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        })
    }
  };

  $scope.filter_category = function () {

    $scope.show_loader = true;

    $scope.filterCategoryShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_category_var.category
    }

    $http.post('server/filter_everyone_by_category.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.filter_nation = function () {

    $scope.show_loader = true;

    $scope.filterNationShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_nation_var.category,
      "nation":$scope.filter_nation_var.nation
    }

    $http.post('server/filter_everyone_by_nation.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.filter_state = function () {

    $scope.show_loader = true;

    $scope.filterStateShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_state_var.category,
      "state":$scope.filter_state_var.state
    }

    $http.post('server/filter_everyone_by_state.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.filter_area = function () {

    $scope.show_loader = true;

    $scope.filterAreaShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_area_var.category,
      "area":$scope.filter_area_var.area
    }

    $http.post('server/filter_everyone_by_area.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.filter_zone = function () {

    $scope.show_loader = true;

    $scope.filterZoneShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_zone_var.category,
      "zone":$scope.filter_zone_var.zone
    }

    $http.post('server/filter_everyone_by_zone.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.filter_choir = function () {

    $scope.show_loader = true;

    $scope.filterChoirShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_choir_var.category,
      "choir":$scope.filter_choir_var.choir
    }

    $http.post('server/filter_everyone_by_choir.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.filter_part = function () {

    $scope.show_loader = true;

    $scope.filterPartShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_part_var.category,
      "part":$scope.filter_part_var.part
    }

    $http.post('server/filter_everyone_by_part.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          // $scope.everyone = undefined;
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.filter_all = function () {

    $scope.show_loader = true;

    $scope.filterAllShow = false;

    $scope.filter_data = {
      "table":"people",
      "category":$scope.filter_all_var.category,
      "nation":$scope.filter_all_var.nation,
      "state":$scope.filter_all_var.state,
      "area":$scope.filter_all_var.area,
      "zone":$scope.filter_all_var.zone,
      "choir":$scope.filter_all_var.choir,
      "part":$scope.filter_all_var.part
    }

    $http.post('server/filter_everyone_by_all.php', $scope.filter_data)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.filteredData;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No data !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Couldn't get data";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })
  };

  $scope.proceed_unauthentication = function () {

    $scope.shouldIShow = true;

    $scope.continue_action = function () {

      $scope.clickOnce = true;

      $scope.filter_data = {
        "table":"people",
        "category":$scope.unauthenticate_var.category
      }

      $http.post('server/unauthenticate_all_by_category.php', $scope.filter_data)
        .then(function (response) {
          if (response.data.engineMessage == 1) {
            $scope.showSuccessStatus = "Unauthenticated everyone in a category!";
            notify.do_notify($scope.result_u, "Edit Activity", "People unauthenticated in a category");
            history.add_history($scope.unauthenticate_var.category, null, "General", "Unauthenticated");
            $timeout(function () {
              $scope.showStatus = undefined;
              $scope.showSuccessStatus = undefined;
              window.location.reload(true);
            }, 3000)
          }
          else if (response.data.noData == 2) {
            $scope.showStatus = "People not found !";
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

  $scope.loadEveryone = function () {

    $http.get('server/get_everyone.php')
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.everyoneStatus = undefined;
          $scope.everyone = response.data.re_data;

          $scope.remove_loader();

          $scope.currentPage=1;
          $scope.numLimit=20;
          $scope.start = 0;
          $scope.$watch('everyone',function(newVal){
            if(newVal){
             $scope.pages=Math.ceil($scope.everyone.length/$scope.numLimit);

            }
          });
          $scope.hideNext=function(){
            if(($scope.start+ $scope.numLimit) < $scope.everyone.length){
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
          $scope.everyoneStatus = "No one found !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.everyoneStatus = "Error Occured";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.everyoneStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.everyoneStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.everyoneStatus = undefined;
        // }, 3000)
      })

  };

  $scope.loadEveryone();

  $scope.send_export = function () {
    $scope.data = {
      "content": [
          {
              "0": "cceeca0b5a",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "0013",
              "4": "BCS/CNCF/NG-RS/0013",
              "5": "Deamon",
              "6": null,
              "7": "Toro",
              "8": "deamnontoro@gmail.com",
              "9": "08173698316",
              "10": "Male",
              "11": "Tenor",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-06-04 14:57:42",
              "19": "2022-06-04 15:04:57",
              "20": "1",
              "uuid": "cceeca0b5a",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "0013",
              "code": "BCS/CNCF/NG-RS/0013",
              "firstname": "Deamon",
              "middlename": null,
              "lastname": "Toro",
              "email": "deamnontoro@gmail.com",
              "phone_number": "08173698316",
              "gender": "Male",
              "part": "Tenor",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-06-04 14:57:42",
              "last_modified": "2022-06-04 15:04:57",
              "status": "1"
          },
          {
              "0": "c6dde5b8a3",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "0012",
              "4": "BCS/CNCF/NG-RS/0012",
              "5": "Emmanuel",
              "6": null,
              "7": "Nwoye",
              "8": "emmanuelnwoye5@gmail.com",
              "9": "+2348093223317",
              "10": "Male",
              "11": "Tenor",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "0",
              "18": "2022-06-02 20:37:31",
              "19": "2022-06-02 20:37:31",
              "20": "1",
              "uuid": "c6dde5b8a3",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "0012",
              "code": "BCS/CNCF/NG-RS/0012",
              "firstname": "Emmanuel",
              "middlename": null,
              "lastname": "Nwoye",
              "email": "emmanuelnwoye5@gmail.com",
              "phone_number": "+2348093223317",
              "gender": "Male",
              "part": "Tenor",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "0",
              "added_date": "2022-06-02 20:37:31",
              "last_modified": "2022-06-02 20:37:31",
              "status": "1"
          },
          {
              "0": "c13ed209fe",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "0011",
              "4": "BCS/CNCF/NG-RS/0011",
              "5": "Emmanuel",
              "6": null,
              "7": "Nwoye",
              "8": "emmakuelnwoye5@gmail.com",
              "9": "+2348093243317",
              "10": "Male",
              "11": "Tenor",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "0",
              "18": "2022-06-02 20:32:15",
              "19": "2022-06-02 20:32:15",
              "20": "1",
              "uuid": "c13ed209fe",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "0011",
              "code": "BCS/CNCF/NG-RS/0011",
              "firstname": "Emmanuel",
              "middlename": null,
              "lastname": "Nwoye",
              "email": "emmakuelnwoye5@gmail.com",
              "phone_number": "+2348093243317",
              "gender": "Male",
              "part": "Tenor",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "0",
              "added_date": "2022-06-02 20:32:15",
              "last_modified": "2022-06-02 20:32:15",
              "status": "1"
          },
          {
              "0": "ca09fdab11",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "0010",
              "4": "BCS/CNCF/NG-RS/0010",
              "5": "Emmanuel",
              "6": null,
              "7": "Nwoye",
              "8": "emmanuselnwoye5@gmail.com",
              "9": "+2348093923317",
              "10": "Male",
              "11": "Tenor",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "0",
              "18": "2022-06-02 20:29:37",
              "19": "2022-06-02 20:29:37",
              "20": "1",
              "uuid": "ca09fdab11",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "0010",
              "code": "BCS/CNCF/NG-RS/0010",
              "firstname": "Emmanuel",
              "middlename": null,
              "lastname": "Nwoye",
              "email": "emmanuselnwoye5@gmail.com",
              "phone_number": "+2348093923317",
              "gender": "Male",
              "part": "Tenor",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "0",
              "added_date": "2022-06-02 20:29:37",
              "last_modified": "2022-06-02 20:29:37",
              "status": "1"
          },
          {
              "0": "cea188308a",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "009",
              "4": "BCS/CNCF/NG-RS/009",
              "5": "Emmanuel",
              "6": "Aneku",
              "7": "Nwoye",
              "8": "emmansuelnwoye5@gmail.com",
              "9": "+2348093423317",
              "10": "Male",
              "11": "Bass",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "0",
              "18": "2022-06-02 15:20:43",
              "19": "2022-06-02 15:20:43",
              "20": "1",
              "uuid": "cea188308a",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "009",
              "code": "BCS/CNCF/NG-RS/009",
              "firstname": "Emmanuel",
              "middlename": "Aneku",
              "lastname": "Nwoye",
              "email": "emmansuelnwoye5@gmail.com",
              "phone_number": "+2348093423317",
              "gender": "Male",
              "part": "Bass",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "0",
              "added_date": "2022-06-02 15:20:43",
              "last_modified": "2022-06-02 15:20:43",
              "status": "1"
          },
          {
              "0": "ce3cdb58b0",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "008",
              "4": "BCS/CNCF/NG-RS/008",
              "5": "Emmanuel",
              "6": "Aneku",
              "7": "Nwoye",
              "8": "emmawnuelnwoye5@gmail.com",
              "9": "+2348093293317",
              "10": "Male",
              "11": "Tenor",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-06-02 15:17:40",
              "19": "2022-06-02 17:06:36",
              "20": "1",
              "uuid": "ce3cdb58b0",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "008",
              "code": "BCS/CNCF/NG-RS/008",
              "firstname": "Emmanuel",
              "middlename": "Aneku",
              "lastname": "Nwoye",
              "email": "emmawnuelnwoye5@gmail.com",
              "phone_number": "+2348093293317",
              "gender": "Male",
              "part": "Tenor",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-06-02 15:17:40",
              "last_modified": "2022-06-02 17:06:36",
              "status": "1"
          },
          {
              "0": "c45d3d533e",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "007",
              "4": "BCS/CNCF/NG-RS/007",
              "5": "Emmanuel",
              "6": "Aneku",
              "7": "Nwoye",
              "8": "emmanuelnswoye5@gmail.com",
              "9": "+2348093323317",
              "10": "Male",
              "11": "Tenor",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "0",
              "18": "2022-06-02 15:13:16",
              "19": "2022-06-02 15:13:16",
              "20": "1",
              "uuid": "c45d3d533e",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "007",
              "code": "BCS/CNCF/NG-RS/007",
              "firstname": "Emmanuel",
              "middlename": "Aneku",
              "lastname": "Nwoye",
              "email": "emmanuelnswoye5@gmail.com",
              "phone_number": "+2348093323317",
              "gender": "Male",
              "part": "Tenor",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "0",
              "added_date": "2022-06-02 15:13:16",
              "last_modified": "2022-06-02 15:13:16",
              "status": "1"
          },
          {
              "0": "cbac53ec34",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "006",
              "4": "BCS/CNCF/NG-RS/006",
              "5": "Jane",
              "6": "Anna",
              "7": "Doe",
              "8": "janedoe@gmail.com",
              "9": "09077348348",
              "10": "Male",
              "11": "Alto",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-05-31 23:10:00",
              "19": "2022-06-02 19:41:25",
              "20": "1",
              "uuid": "cbac53ec34",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "006",
              "code": "BCS/CNCF/NG-RS/006",
              "firstname": "Jane",
              "middlename": "Anna",
              "lastname": "Doe",
              "email": "janedoe@gmail.com",
              "phone_number": "09077348348",
              "gender": "Male",
              "part": "Alto",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-05-31 23:10:00",
              "last_modified": "2022-06-02 19:41:25",
              "status": "1"
          },
          {
              "0": "c3d79a5b36",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "005",
              "4": "BCS/CNCF/NG-RS/005",
              "5": "Deltoro",
              "6": null,
              "7": "Xsa",
              "8": "aswaggnigga@yahoo.com",
              "9": "08027540047",
              "10": "Male",
              "11": "Tenor",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-05-31 23:09:03",
              "19": "2022-06-02 19:40:26",
              "20": "1",
              "uuid": "c3d79a5b36",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "005",
              "code": "BCS/CNCF/NG-RS/005",
              "firstname": "Deltoro",
              "middlename": null,
              "lastname": "Xsa",
              "email": "aswaggnigga@yahoo.com",
              "phone_number": "08027540047",
              "gender": "Male",
              "part": "Tenor",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-05-31 23:09:03",
              "last_modified": "2022-06-02 19:40:26",
              "status": "1"
          },
          {
              "0": "c24bead1bc",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "004",
              "4": "BCS/CNCF/NG-RS/004",
              "5": "Deamon",
              "6": null,
              "7": "Toro",
              "8": "deamontoro@gmail.com",
              "9": "08123698316",
              "10": "Male",
              "11": "Bass",
              "12": "Family Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-05-31 23:08:22",
              "19": "2022-06-02 19:37:21",
              "20": "1",
              "uuid": "c24bead1bc",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "004",
              "code": "BCS/CNCF/NG-RS/004",
              "firstname": "Deamon",
              "middlename": null,
              "lastname": "Toro",
              "email": "deamontoro@gmail.com",
              "phone_number": "08123698316",
              "gender": "Male",
              "part": "Bass",
              "choir": "Family Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-05-31 23:08:22",
              "last_modified": "2022-06-02 19:37:21",
              "status": "1"
          },
          {
              "0": "c03d83643c",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "003",
              "4": "BCS/CNCF/NG-RS/003",
              "5": "David",
              "6": null,
              "7": "Lambert",
              "8": "davidlambert@yahoo.com",
              "9": "+124824892482",
              "10": "Male",
              "11": "Tenor",
              "12": "Agip Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-05-31 23:07:26",
              "19": "2022-06-02 19:20:42",
              "20": "1",
              "uuid": "c03d83643c",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "003",
              "code": "BCS/CNCF/NG-RS/003",
              "firstname": "David",
              "middlename": null,
              "lastname": "Lambert",
              "email": "davidlambert@yahoo.com",
              "phone_number": "+124824892482",
              "gender": "Male",
              "part": "Tenor",
              "choir": "Agip Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-05-31 23:07:26",
              "last_modified": "2022-06-02 19:20:42",
              "status": "1"
          },
          {
              "0": "c5e06f73ed",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "002",
              "4": "BCS/CNCF/NG-RS/002",
              "5": "John",
              "6": "",
              "7": "Doe",
              "8": "johndoe@gmail.com",
              "9": "08138848294",
              "10": "Male",
              "11": "Bass",
              "12": "51 Ngo Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-05-31 23:06:28",
              "19": "2022-06-02 19:14:48",
              "20": "1",
              "uuid": "c5e06f73ed",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "002",
              "code": "BCS/CNCF/NG-RS/002",
              "firstname": "John",
              "middlename": "",
              "lastname": "Doe",
              "email": "johndoe@gmail.com",
              "phone_number": "08138848294",
              "gender": "Male",
              "part": "Bass",
              "choir": "51 Ngo Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-05-31 23:06:28",
              "last_modified": "2022-06-02 19:14:48",
              "status": "1"
          },
          {
              "0": "ce71d0aa5e",
              "1": "CNCF Diamond Division Grading Exercise 2022",
              "2": "cncf-diamond-division-grading-exercise-2022",
              "3": "001",
              "4": "BCS/CNCF/NG-RS/001",
              "5": "Emmanuel",
              "6": "Aneku",
              "7": "Nwoye",
              "8": "emmanuelnswoye5@gmail.com",
              "9": "+2348003223317",
              "10": "Male",
              "11": "Tenor",
              "12": "Mother Bethel Choir",
              "13": "Diobu Zone",
              "14": "Port Harcourt Area 1",
              "15": "Rivers",
              "16": "Nigeria",
              "17": "1",
              "18": "2022-05-31 23:05:39",
              "19": "2022-06-02 19:11:34",
              "20": "1",
              "uuid": "ce71d0aa5e",
              "category": "CNCF Diamond Division Grading Exercise 2022",
              "stripped": "cncf-diamond-division-grading-exercise-2022",
              "serial_number": "001",
              "code": "BCS/CNCF/NG-RS/001",
              "firstname": "Emmanuel",
              "middlename": "Aneku",
              "lastname": "Nwoye",
              "email": "emmanuelnswoye5@gmail.com",
              "phone_number": "+2348003223317",
              "gender": "Male",
              "part": "Tenor",
              "choir": "Mother Bethel Choir",
              "zone": "Diobu Zone",
              "area": "Port Harcourt Area 1",
              "state": "Rivers",
              "nation": "Nigeria",
              "authenticated": "1",
              "added_date": "2022-05-31 23:05:39",
              "last_modified": "2022-06-02 19:11:34",
              "status": "1"
          }
          ]
    }
    $http.post('server/export_to_excel.php', $scope.data)
      .then(function (response) {

      }, function (error) {
      })
  };

  $scope.user = {};

  $scope.authenticate_user = function (uuid, category, category_uuid, firstname, middlename, lastname, email, phone_number, serial_number, code) {


    $scope.continue_action = function () {

      $scope.clickOnce = true;

      $scope.deleteData = {
        "uuid":uuid
      }

      $http.post('server/authenticate_person.php', $scope.deleteData)
        .then(function (response) {
          if (response.data.engineMessage == 1) {
            $scope.showSuccessStatus = "User authenticated for " + category;
            notify.do_notify($scope.result_u, "Edit Activity", "User (" + serial_number + ") authenticated for " + category);
            history.add_history(category_uuid, uuid, "Personal", "Authenticated");
            $timeout(function () {
              $scope.showStatus = undefined;
              $scope.showSuccessStatus = undefined;
              $rootScope.imageStatus = undefined;
              window.location.reload(true);
              $scope.load();
            }, 3000)
          }
          else {
            $scope.showStatus = "Error Occured";
            $timeout(function () {
              $scope.showStatus = undefined;
              $scope.showSuccessStatus = undefined;
            }, 3000)
          }
        }, function (error) {
          $scope.showStatus = "Something's Wrong";
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
          }, 3000)
        })

    };

  };

  $scope.delete_person = function (uuid, category, serial_number, code) {


    $scope.continue_action = function () {

      $scope.clickOnce = true;

      $scope.deleteData = {
        "uuid":uuid
      }

      $http.post('server/delete_person.php', $scope.deleteData)
        .then(function (response) {
          if (response.data.engineMessage == 1) {
            $scope.showSuccessStatus = "Sign up deleted from " + category + "";
            $scope.notify_text = "Sign up with serial " + serial_number + ", code " + code + " was deleted from " + category + " category.";
            notify.do_notify($scope.result_u, "Delete Activity", $scope.notify_text);
            $timeout(function () {
              $scope.showStatus = undefined;
              $scope.showSuccessStatus = undefined;
              $rootScope.imageStatus = undefined;
              window.location.reload(true);
              $scope.load();
            }, 3000)
          }
          else {
            $scope.showStatus = "Error Occured";
            $timeout(function () {
              $scope.showStatus = undefined;
              $scope.showSuccessStatus = undefined;
            }, 3000)
          }
        }, function (error) {
          $scope.showStatus = "Something's Wrong";
          $timeout(function () {
            $scope.showStatus = undefined;
            $scope.showSuccessStatus = undefined;
          }, 3000)
        })

    };

  };

  $scope.view_person = function (uuid, category, stripped, serial_number, code) {
    window.open($location.protocol() + "://" + $location.host() + ":" + $location.port() + "/chuks_project/" + stripped + "/signup?code=" + code);
    // window.open("https://datalogic.toonlogicstudio.com/" + stripped + "/signup?code=" + code);
  };

});
