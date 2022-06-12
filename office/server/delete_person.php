<?php

  require 'connect.php';

  class deletePersonClass {
    public $engineMessage = 0;
    public $noData = 0;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {
    try {
      $conn->beginTransaction();

      date_default_timezone_set("Africa/Lagos");

      $date_added = date("Y-m-d H:i:s");

      $sql = "SELECT * FROM people WHERE uuid=:uuid";
      $query = $conn->prepare($sql);
      $query->bindParam(":uuid", $data['uuid']);
      $query->execute();

      if ($query->rowCount() > 0) {
        $sql2 = "DELETE FROM people WHERE uuid=:uuid";
        $query2 = $conn->prepare($sql2);
        $query2->bindParam(':uuid', $data['uuid']);
        $query2->execute();

        if ($query2) {
          $returnvalue = new deletePersonClass();
          $returnvalue->engineMessage = 1;
        }

      }
      else {
        $returnvalue = new deletePersonClass();
        $returnvalue->noData = 2;

      }

      $conn->commit();
    } catch (PDOException $e) {
      $conn->rollback();
      throw $e;
    }
    echo json_encode($returnvalue);
  }

?>
