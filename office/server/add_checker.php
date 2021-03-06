<?php

  require 'connect.php';

  class addCheckerClass {
    public $engineMessage = 0;
    public $checkerAlreadyExists = 0;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {

    try {
      $conn->beginTransaction();

      $sql = "SELECT user_uuid FROM checkers WHERE username=:username OR email=:email";
      $query = $conn->prepare($sql);
      $query->bindParam(':username', $data['username']);
      $query->bindParam(':email', $data['email']);
      $query->execute();

      if ($query->rowCount() > 0) {
        $returnvalue = new addCheckerClass();
        $returnvalue->checkerAlreadyExists = 2;
      }
      else {

        date_default_timezone_set("Africa/Lagos");
        $date_added = date("Y-m-d H:i:s");
        $active = 1;

        $hybrid_uuid_2 = "";

        $data['user_role'] = 4;

        function uuid_gen_2() {
          $alpha = md5(rand(100,200));
          $beta = str_shuffle($alpha);
          $omega = str_split($beta, 9);

          $GLOBALS['hybrid_uuid_2'] = strtoupper("C".$omega[1]);
        }

        uuid_gen_2();

        $password = $data['password'];
        // $password = "Nigga144";

        function cus_salt(){
          $david = md5(rand(100, 200));
          return $david;
        }

        $options = [

          'cost' => 12
        ];

        $lash = password_hash($password, PASSWORD_DEFAULT, $options);

        $sql = "INSERT INTO checkers (user_uuid, edit_user_uuid, user_role, username, email, fullname, gender, phone_number, password, added_date, last_modified, access, status)
        VALUES (:user_uuid, :edit_user_uuid, :user_role, :username, :email, :fullname, :gender, :phone_number, :password, :added_date, :last_modified, :access, :status)";

        $query = $conn->prepare($sql);
        $query->bindParam(':user_uuid', $hybrid_uuid_2);
        $query->bindParam(':edit_user_uuid', $data['edit_user_uuid']);
        $query->bindParam(':user_role', $data['user_role']);
        $query->bindParam(':username', $data['username']);
        $query->bindParam(':email', $data['email']);
        $query->bindParam(':fullname', $data['fullname']);
        $query->bindParam(':gender', $data['gender']);
        $query->bindParam(':phone_number', $data['phone_number']);
        $query->bindParam(':password', $lash);
        $query->bindParam(':added_date', $date_added);
        $query->bindParam(':last_modified', $date_added);
        $query->bindParam(':access', $active);
        $query->bindParam(':status', $active);
        $query->execute();

        $returnvalue = new addCheckerClass();
        $returnvalue->engineMessage = 1;

      }

      $conn->commit();
    } catch (PDOException $e) {
      $conn->rollback();
      throw $e;
    }

    echo json_encode($returnvalue);

  }

?>
