chuks_project_signup.controller('signupCtrl',function($scope,$rootScope,$http,$timeout,$location,$route,$routeParams,$window,cncf_nations,cncf_states,cncf_states_id,cncf_areas,cncf_zones,cncf_bethels,cncf_choirs){

  $rootScope.pageTitle = "Data-Logic Intersys - Sign up";

  // -------------------------------- Don't touch this code --------------------------------

  $scope.para_1 = function () {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  $scope.para_2 = function () {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  $scope.para_3 = function () {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  $scope.para_4 = function () {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // ----------------------------------------------------------------------------------------

  $scope.loadingStatus = "Searching ...";

  $scope.remove_loader = function () {

    $timeout(function () {
      $scope.loadingStatus = undefined;
    }, 2000)

  };

  $scope.user = {};

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

  $scope.change_state_id = function (obj) {

    $scope.state_id = undefined;

    $scope.state_idList = cncf_states_id.states_id();

    angular.forEach($scope.state_idList, function (value, key) {
      if (key == obj) {
        $scope.user.state_id = value;
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

  $rootScope.added_image = true;

  $scope.form = [];
  $scope.files = [];

  $scope.uploadedFile = function(element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();


    reader.onload = function(event) {
      $scope.image_source = event.target.result
      $scope.$apply(function($scope) {
        $scope.files = element.files;
      });
    }
                reader.readAsDataURL(element.files[0]);
  };

  $scope.loadCategory = function () {

    $scope.categoryData = {
      "stripped":$routeParams.category
    }

    $http.post('server/get_category.php', $scope.categoryData)
      .then(function (response) {
        if (response.data.engineMessage == 1) {
          $scope.categoryStatus = undefined;
          $scope.category = response.data.re_data;
          $rootScope.pageTitle = $scope.category.category + " - Sign up";
          $scope.category_view = {
            "uuid": $scope.category.uuid
          }
          $http.post('server/add_category_view.php', $scope.category_view)
          $scope.remove_loader();

          $scope.signUp = function () {

            $scope.shouldIShow = true;
            $scope.user.category = $scope.category.uuid;
            $scope.user.code = "BCS/CNCF/" + $scope.user.state_id + "/";
            $scope.user.middlename = $scope.user.middlename == undefined ? null : $scope.user.middlename;

            $scope.continue_action = function () {

              $scope.clickOnce = true;

              $scope.form.image = $scope.files[0];

              $scope.showProgress = false;
              $rootScope.fileUploadStatusError = undefined;
              $rootScope.fileUploadStatusSuccess = undefined;
              $scope.errorFileUpload = false;
              $scope.successFileUpload = false;
              $scope.showSuccessStatus = undefined;
              $scope.showStatus = undefined;

              var uploadForm = new FormData();
              uploadForm.append("file", $scope.form.image);
              $http.post('server/uploadsignupimage.php', uploadForm, {
                  transformRequest:angular.identity,
                  headers: {'Content-Type':undefined, 'Process-Data': false},
                  uploadEventHandlers: {
                    progress: function (e) {
                      if (e.lengthComputable) {
                        $scope.showProgress = true;
                        $scope.progressBar = (e.loaded / e.total) * 100;
                        $scope.progressCounter = $scope.progressBar.toFixed(2) + '%';
                      }
                    }
                  }
              })
              .then(function(response){
                if(response.data.error){
                    $scope.showProgress = false;
                    $scope.errorFileUpload = true;
                    $rootScope.fileUploadStatusError = response.data.message;
                    $timeout(function(response){
                      $rootScope.fileUploadStatusError = "";
                      $scope.clickOnce = false;
                      $scope.errorFileUpload = false;
                    },5000);
                }
                else{

                  $scope.successFileUpload = true;
                  $rootScope.signup_image = response.data.return_file;
                  $rootScope.signup_image_file = response.data.return_filename;
                  $rootScope.signup_image_file_size = response.data.return_filesize;
                  $rootScope.fileUploadStatusSuccess = response.data.message;

                  $scope.user.image = $rootScope.signup_image;
                  $scope.user.file = $rootScope.signup_image_file;
                  $scope.user.file_size = $rootScope.signup_image_file_size;
                  $scope.user.path_to_delete = $rootScope.signup_image;

                  $scope.clickOnce = true;

                  $http.post('server/signup.php', $scope.user)
                  .then(function (response) {
                    if (response.data.engineMessage == 1) {

                      $scope.fullname = $scope.user.firstname + ($scope.user.middlename != null ? " " + $scope.user.middlename + " " : " ") + $scope.user.lastname;
                      $scope.email_subject = "Receipt for " + $scope.category.category;
                      $scope.description = "Thank you for signing up for" + $scope.category.category + " event . <br>Here's your unique qr code pass for this event. Don't delete this mail, it'll be used to identify you in the event.<br><h3>Thanks for using our platform <a href='https://www.toonlogicstudio.com/'>Data-Logic Intersys - Toon Logic Studio</a></h3>";
                      $scope.qr_code = "https://datalogic.toonlogicstudio.com/" + $scope.category.stripped + "/signup?code=" + $scope.user.code;

                      $scope.requestData = {
                        "fullname":$scope.fullname,
                        "email":$scope.user.email,
                        "subject":$scope.email_subject,
                        "description":$scope.description,
                        "code":$scope.user.code,
                        "qr_code":$scope.qr_code
                      }

                       $http.post('server/auto_email_response.php', $scope.requestData)
                        .then(function success(response) {
                          if (response.data.engineMessage == 1) {
                            // $scope.showSuccessStatus = true;
                            // $scope.confirmStatus = "Request Sent";
                            // $timeout(function() {
                            //   $scope.showSuccessStatus = undefined;
                            //   $scope.confirmStatus = "";
                            //   $route.reload();
                            // }, 3000)
                          }
                          else if (response.data.error == 2) {
                            // $scope.showStatus = true;
                            // $scope.resetStatus = "Error Occured";
                            // $timeout(function() {
                            //   $scope.showStatus = undefined;
                            //   $scope.resetStatus = "";
                            //   $route.reload();
                            // }, 3000)
                          }
                        }, function error(response) {
                          // $scope.showStatus = true;
                          // $scope.resetStatus = "Something's Wrong";
                          // $timeout(function() {
                          //   $scope.showStatus = undefined;
                          //   $scope.resetStatus = "";
                          //   $route.reload();
                          // }, 3000)
                        })

                      $scope.showSuccessStatus = true;
                      $scope.actionStatus = "Successfully signed up for " + $scope.category.category;

                      $timeout(function () {
                        $scope.showSuccessStatus = undefined;
                        $scope.actionStatus = undefined;
                        $scope.showProgress = false;
                        $rootScope.fileUploadStatusError = undefined;
                        $rootScope.fileUploadStatusSuccess = undefined;
                        window.location.reload(true);
                      }, 5000)

                    }
                    else if (response.data.alreadyExists == 2){
                      $scope.showStatus = true;
                      $scope.actionStatus = "User already exists";
                      $timeout(function () {
                        $scope.showStatus = undefined;
                        $scope.actionStatus = undefined;
                        $scope.clickOnce = false;
                      }, 3000)
                    }
                    else {
                      $scope.showStatus = true;
                      $scope.actionStatus = "Error Occured";
                      $timeout(function () {
                        $scope.showStatus = undefined;
                        $scope.actionStatus = undefined;
                        $scope.clickOnce = false;
                      }, 3000)
                    }
                  }, function (error) {
                    $scope.showStatus = true;
                    $scope.actionStatus = "Something's Wrong";
                    $timeout(function () {
                      $scope.showStatus = undefined;
                      $scope.actionStatus = undefined;
                      $scope.clickOnce = false;
                    }, 3000)
                  })

                }
              }, function (error) {
                // console.log(response);
                $scope.showProgress = false;
                $scope.errorFileUpload = true;
                $rootScope.fileUploadStatusError = response.message;
                $timeout(function(response){
                  $rootScope.fileUploadStatusError = "";
                  $scope.clickOnce = false;
                  $scope.errorFileUpload = false;
                },5000);
              })

            };

            $scope.removeConfirmModal = function () {

              $scope.shouldIShow = undefined;

            };

          };

        }
        else if (response.data.noData == 2) {
          $scope.categoryStatus = "Category not available !";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.categoryStatus = undefined;
          // }, 3000)
        }
        else {
          $scope.categoryStatus = "Error Occured";
          $scope.remove_loader();
          // $timeout(function () {
          //   $scope.categoryStatus = undefined;
          // }, 3000)
        }
      }, function (error) {
        $scope.categoryStatus = "Something's Wrong";
        $scope.remove_loader();
        // $timeout(function () {
        //   $scope.categoryStatus = undefined;
        // }, 3000)
      })

  };

  $scope.loadCategory();


});
