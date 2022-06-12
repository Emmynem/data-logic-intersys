chuks_project_signup.controller('profileCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,$routeParams,storage,$window,notify,history){

  $rootScope.pageTitle = "Data-Logic Intersys";
  $scope.str_u = storage.get_U_u();
  $scope.result_u = $scope.str_u !== undefined && $scope.str_u !== null ? $scope.str_u.substring(4, 14) : null;
  $scope.main_role = storage.getRole();

  $scope.this_year = new Date().getFullYear();

  $scope.loadingStatus = "Searching ...";

  $scope.remove_loader = function () {

    $timeout(function () {
      $scope.loadingStatus = undefined;
    }, 2000)

  };

  if($location.search().code == "" || $location.search().code == undefined || $location.search().code == null){
    $scope.categoryPersonStatus = "Code is required !";
    $scope.remove_loader();
  }
  else {
    $scope.loadCategory = function () {

      $scope.categoryData = {
        "stripped":$routeParams.category,
        "code":$location.search().code
      }

      $http.post('server/get_category_person.php', $scope.categoryData)
        .then(function (response) {
          if (response.data.engineMessage == 1) {
            $scope.categoryPersonStatus = undefined;
            $scope.categoryPerson = response.data.re_data;
            $rootScope.pageTitle = $scope.categoryPerson.firstname + ($scope.categoryPerson.middlename != null ? " " + $scope.categoryPerson.middlename + " " : " ") + $scope.categoryPerson.lastname + " - " + $scope.categoryPerson.category;
            $scope.fullname = $scope.categoryPerson.firstname + ($scope.categoryPerson.middlename != null ? " " + $scope.categoryPerson.middlename + " " : " ") + $scope.categoryPerson.lastname;
            $scope.qr_code = "https://intersys.toonlogicstudio.com/" + $routeParams.category + "/signup?code=" + $scope.categoryPerson.code;

            $scope.remove_loader();

          }
          else if (response.data.noData == 2) {
            $scope.categoryPersonStatus = "User not found in category !";
            $scope.remove_loader();
            // $timeout(function () {
            //   $scope.categoryPersonStatus = undefined;
            // }, 3000)
          }
          else {
            $scope.categoryPersonStatus = "Error Occured";
            $scope.remove_loader();
            // $timeout(function () {
            //   $scope.categoryPersonStatus = undefined;
            // }, 3000)
          }
        }, function (error) {
          $scope.categoryPersonStatus = "Something's Wrong";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.categoryPersonStatus = undefined;
          // }, 3000)
        })

    };

    $scope.loadCategory();

    $scope.authenticate_user = function (uuid, category_uuid, category, firstname, middlename, lastname, email, phone_number, serial_number, code) {

      $scope.shouldIShow = true;

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
                $scope.removeConfirmModal();
                $scope.clickOnce = false;
                $scope.loadCategory();
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

      $scope.removeConfirmModal = function () {

        $scope.shouldIShow = undefined;

      };

    };

    $scope.unauthenticate_user = function (uuid, category_uuid, category, firstname, middlename, lastname, email, phone_number, serial_number, code) {

      $scope.shouldIShow = true;

      $scope.continue_action = function () {

        $scope.clickOnce = true;

        $scope.deleteData = {
          "uuid":uuid
        }

        $http.post('server/unauthenticate_person.php', $scope.deleteData)
          .then(function (response) {
            if (response.data.engineMessage == 1) {
              $scope.showSuccessStatus = "User unauthenticated for " + category;
              notify.do_notify($scope.result_u, "Edit Activity", "User (" + serial_number + ") unauthenticated for " + category);
              history.add_history(category_uuid, uuid, "Personal", "Unauthenticated");
              $timeout(function () {
                $scope.showStatus = undefined;
                $scope.showSuccessStatus = undefined;
                $scope.removeConfirmModal();
                $scope.clickOnce = false;
                $scope.loadCategory();
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

      $scope.removeConfirmModal = function () {

        $scope.shouldIShow = undefined;

      };

    };

  }

});
