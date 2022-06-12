<?php

  require 'connect.php';

  class notifyClass {
    public $engineMessage = 0;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {

    try {
      $conn->beginTransaction();

      date_default_timezone_set("Africa/Lagos");
      $date_added = date("Y-m-d H:i:s");

      $active = 1;

      $hybrid_uuid = "";

      function uuid_gen() {
        $alpha = md5(rand(100,200));
        $beta = str_shuffle($alpha);
        $omega = str_split($beta, 9);

        $GLOBALS['hybrid_uuid'] = strtoupper("n".$omega[1]);
      }

      uuid_gen();

      $sql = "INSERT INTO notifications (user_uuid, uuid, type, action, added_date, status)
      VALUES (:user_uuid, :uuid, :type, :action, :added_date, :status) ";
      $query = $conn->prepare($sql);
      $query->bindParam(':user_uuid', $data['user_uuid']);
      $query->bindParam(':uuid', $hybrid_uuid);
      $query->bindParam(':type', $data['type']);
      $query->bindParam(':action', $data['action']);
      $query->bindParam(':added_date', $date_added);
      $query->bindParam(':status', $active);
      $query->execute();

      if ($query) {
        $returnvalue  = new notifyClass();
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
