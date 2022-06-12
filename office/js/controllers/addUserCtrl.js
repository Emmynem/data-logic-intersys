chuks_project.controller('add-userCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,$window,storage,notify){

  $rootScope.pageTitle = "Add User";

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

  $scope.remove_loader();

  $scope.user = {};

  $scope.show_add_form = true; // Remove if you're using one account

  $scope.save_user = function () {

    if ($scope.user.password != $scope.user.confirmPassword) {
      $scope.things = true;
      $scope.passwordStatus = "Confirm Password Doesn't Match";
      $timeout(function () {
        $scope.passwordStatus = "";
      }, 3000);
    }
    else {
      $scope.things = undefined;
      $scope.shouldIShow = true;

      $scope.continue_action = function () {

        $scope.clickOnce = true;

        $scope.userData = {
          "edit_user_uuid":$scope.result_u,
          "user_role":$scope.user.role,
          "username":$scope.user.username,
          "fullname":$scope.user.firstname + " " + $scope.user.lastname,
          "email":$scope.user.email,
          "gender":$scope.user.gender,
          "phone_number":$scope.user.phone_number,
          "password":$scope.user.password
        }

        $http.post('server/add_user.php', $scope.userData)
          .then(function (response) {
            if (response.data.engineMessage == 1) {

              $scope.showSuccessStatus = "User Added !";

              notify.do_notify($scope.result_u, "Add Activity", "Office user added");

              $timeout(function () {
                $scope.showSuccessStatus = undefined;
                $scope.showStatus = undefined;
                $scope.clickOnce = false;
                $location.path('all-users');
              }, 3000);
            }
            else if (response.data.userAlreadyExists == 2){
              $scope.showStatus = "Email / Username already exists";

              $timeout(function () {
                $scope.showSuccessStatus = undefined;
                $scope.showStatus = undefined;
                $scope.clickOnce = false;
              }, 3000);
            }
            else {
              $scope.showStatus = "Couldn't add user !";

              $timeout(function () {
                $scope.showSuccessStatus = undefined;
                $scope.showStatus = undefined;
                $scope.clickOnce = false;
              }, 3000);
            }
          }, function (error) {
            $scope.showStatus = "Something's Wrong !";

            $timeout(function () {
              $scope.showSuccessStatus = undefined;
              $scope.showStatus = undefined;
              $scope.clickOnce = false;
            }, 3000);
          })

      };

      $scope.removeConfirmModal = function () {

        $scope.shouldIShow = undefined;

      };

    }

  };

  $scope.loadDetails = function (email) {

    $scope.if_emails_exists = undefined;

    $scope.show_search_loader = true;

    $timeout(function () {

      $scope.user_details = xnyderAuth.getRequiredDetails(email);

      if ($scope.user_details != undefined || $scope.user_details == "Not found") {
        $scope.if_emails_exists = false;

        $scope.show_search_loader = false;

        $scope.email = {};

        $scope.email.fullname = $scope.user_details.fullname;
        $scope.email.email = $scope.user_details.emailAddress;
        $scope.user_image = $scope.user_details.profileImageWebp;

      }
      else {
        $scope.show_search_loader = false;

        $scope.if_emails_exists = true;
        $scope.usersModalStatus = "Email not found in one account !";
        $timeout(function () {
          $scope.usersModalStatus = undefined;
          $scope.if_emails_exists = undefined;
        }, 3000);
      }

    }, 1000);

  };

  $scope.addUser = function (obj) {

    $scope.getUserData = {
      "email":obj
    }

    $http.post("server/search_for_user.php", $scope.getUserData)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.show_add_form = true;

          $scope.user_details = xnyderAuth.getRequiredDetails(obj);

          if ($scope.user_details != undefined || $scope.user_details == "Not found") {


            $scope.addUserStatus = undefined;

            $scope.user.firstname = $scope.user_details.firstname;
            $scope.user.lastname = $scope.user_details.lastname;
            $scope.user.email = $scope.user_details.emailAddress;
            $scope.user.gender = $scope.user_details.gender;
            $scope.user.phone = $scope.user_details.mobile;

            $scope.if_emails_exists = undefined;

          }
          else {
            $scope.addUserStatus = "Email not found in one account !";
            $scope.show_add_form = false;
            $scope.usersModalStatus = undefined;
            $scope.if_emails_exists = undefined;
            $timeout(function () {
              $route.reload();
            }, 3000);
          }

        }
        else if (response.data.alreadyExists == 2){
          $scope.show_add_form = false;
          $scope.addUserStatus = "User Already Exists !";
          $timeout(function () {
            $route.reload();
          }, 3000);
        }
        else {
          $scope.show_add_form = false;
          $scope.addUserStatus = "Couldn't look for user !";
          $timeout(function () {
            $route.reload();
          }, 3000);
        }
      }, function (error) {
        $scope.addUserStatus = "Something's Wrong !";
        $timeout(function () {
          $route.reload();
        }, 3000);
      })
  };

  $scope.saveUser = function(){

    $scope.shouldIShow = true;

    $scope.continue_action = function () {

      $scope.clickOnce = true;

      $scope.getUserData = {
        "edit_user_uuid":$scope.result_u,
        "user_role":$scope.user.role,
        "username":$scope.user.username,
        "email":$scope.user.email,
        "fullname":$scope.user.firstname + ' ' + $scope.user.lastname,
        "gender":$scope.user.gender,
        "phone_number":$scope.user.phone
      }

      $http.post("server/add_user.php", $scope.getUserData)
        .then(function (response) {
          if (response.data.engineMessage == 1) {

            $scope.showSuccessStatus = "User Added !";

            notify.do_notify($scope.result_u, "Add Activity", "Office user added");

            $timeout(function () {
              $scope.showSuccessStatus = undefined;
              $scope.showStatus = undefined;
              $scope.clickOnce = false;
              $location.path('all-users');
            }, 3000);
          }
          else if (response.data.userAlreadyExists == 2){
            $scope.showStatus = "Email / Username already exists";

            $timeout(function () {
              $scope.showSuccessStatus = undefined;
              $scope.showStatus = undefined;
              $scope.clickOnce = false;
            }, 3000);
          }
          else {
            $scope.showStatus = "Couldn't add user !";

            $timeout(function () {
              $scope.showSuccessStatus = undefined;
              $scope.showStatus = undefined;
              $scope.clickOnce = false;
            }, 3000);
          }
        }, function (error) {
          $scope.showStatus = "Something's Wrong !";

          $timeout(function () {
            $scope.showSuccessStatus = undefined;
            $scope.showStatus = undefined;
            $scope.clickOnce = false;
          }, 3000);
        })

    };

    $scope.removeConfirmModal = function () {

      $scope.shouldIShow = undefined;

    };

  };

});
