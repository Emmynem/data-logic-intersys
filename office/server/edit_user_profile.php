<?php

  require 'connect.php';

  class editUserProfileClass {
    public $engineMessage = 0;
    public $noUser = 0;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {
    try {
      $conn->beginTransaction();

      $sql = "SELECT fullname, gender, phone_number FROM users WHERE user_uuid=:user_uuid";
      $query = $conn->prepare($sql);
      $query->bindParam(":user_uuid", $data['user_uuid']);
      $query->execute();

      if ($query->rowCount() > 0) {
        date_default_timezone_set("Africa/Lagos");
        $date_added = date("Y-m-d H:i:s");

        $sql2 = "UPDATE users SET fullname=:fullname, phone_number=:phone_number, last_modified=:last_modified WHERE user_uuid=:user_uuid";
        $query2 = $conn->prepare($sql2);
        $query2->bindParam(':user_uuid', $data['user_uuid']);
        $query2->bindParam(':fullname', $data['fullname']);
        $query2->bindParam(':phone_number', $data['phone_number']);
        $query2->bindParam(':last_modified', $date_added);
        $query2->execute();

        $returnvalue = new editUserProfileClass();
        $returnvalue->engineMessage = 1;

      }
      else {
        $returnvalue = new editUserProfileClass();
        $returnvalue->noUser = 2;
      }

      $conn->commit();
    } catch (PDOException $e) {
      $conn->rollback();
      throw $e;
    }

    echo json_encode($returnvalue);
  }

?>
