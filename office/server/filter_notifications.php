<?php

  require 'connect.php';

  class getFilteredDataClass {
    public $engineMessage = 0;
    public $noData = 0;
    public $filteredData;
    public $totalCount;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {

    try {
      $conn->beginTransaction();

      $table = $data['table'];

      $active = 1;

      $user_role = $data['user_role'];

      $start = $data['start'];
      $numLimit = $data['numLimit'];

      if ($user_role == 1 || $user_role == 2) {

        $sql = "SELECT notification.user_uuid, notification.uuid, notification.type, notification.action, notification.added_date, notification.status, user.fullname FROM notifications notification INNER JOIN users user ON notification.user_uuid = user.user_uuid
        WHERE notification.status=:status AND notification.added_date >:startdate AND (notification.added_date <:enddate OR notification.added_date=:enddate) ORDER BY notification.added_date DESC LIMIT ".$start.",".$numLimit."";
        $query = $conn->prepare($sql);
        $query->bindParam(':startdate', $data['startdate']);
        $query->bindParam(':enddate', $data['enddate']);
        $query->bindParam(":status", $active);
        $query->execute();

        if ($query->rowCount() > 0) {

          $sql3 = "SELECT COUNT(*) FROM notifications WHERE status=:status AND added_date >:startdate AND (added_date <:enddate OR added_date=:enddate) ORDER BY added_date DESC";
          $query3 = $conn->prepare($sql3);
          $query3->bindParam(':startdate', $data['startdate']);
          $query3->bindParam(':enddate', $data['enddate']);
          $query3->bindParam(':status', $active);
          $query3->execute();

          $allData = $query->fetchAll();

          $totalOverallCount = $query3->fetch();

          $returnvalue = new getFilteredDataClass();
          $returnvalue->engineMessage = 1;
          $returnvalue->filteredData = $allData;
          $returnvalue->totalCount = $totalOverallCount[0];
        }
        else {
          $returnvalue = new getFilteredDataClass();
          $returnvalue->noData = 2;
        }

      }
      else {

        $sql = "SELECT notification.user_uuid, notification.uuid, notification.type, notification.action, notification.added_date, notification.status, user.fullname FROM notifications notification INNER JOIN users user ON notification.user_uuid = user.user_uuid
        WHERE notification.user_uuid=:user_uuid notification.status=:status AND notification.added_date >:startdate AND (notification.added_date <:enddate OR notification.added_date=:enddate) ORDER BY notification.added_date DESC LIMIT ".$start.",".$numLimit."";
        $query = $conn->prepare($sql);
        $query->bindParam(":user_uuid", $data['user_uuid']);
        $query->bindParam(':startdate', $data['startdate']);
        $query->bindParam(':enddate', $data['enddate']);
        $query->bindParam(":status", $active);
        $query->execute();

        if ($query->rowCount() > 0) {

          $sql3 = "SELECT COUNT(*) FROM notifications WHERE user_uuid=:user_uuid AND status=:status AND added_date >:startdate AND (added_date <:enddate OR added_date=:enddate) ORDER BY added_date DESC";
          $query3 = $conn->prepare($sql3);
          $query3->bindParam(':user_uuid', $data['user_uuid']);
          $query3->bindParam(':startdate', $data['startdate']);
          $query3->bindParam(':enddate', $data['enddate']);
          $query3->bindParam(':status', $active);
          $query3->execute();

          $allData = $query->fetchAll();

          $totalOverallCount = $query3->fetch();

          $returnvalue = new getFilteredDataClass();
          $returnvalue->engineMessage = 1;
          $returnvalue->filteredData = $allData;
          $returnvalue->totalCount = $totalOverallCount[0];
        }
        else {
          $returnvalue = new getFilteredDataClass();
          $returnvalue->noData = 2;
        }

      }

      $conn->commit();
    } catch (PDOException $e) {
      $conn->rollback();
      throw $e;
    }

    echo json_encode($returnvalue);
  }

?>
