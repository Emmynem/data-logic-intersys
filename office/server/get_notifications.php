<?php

  require 'connect.php';

  class getNotificationsClass {
    public $engineMessage = 0;
    public $noData = 0;
    public $re_data;
    public $totalCount;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {

    try {
      $conn->beginTransaction();

      $active = 1;

      $user_role = $data['user_role'];

      $start = $data['start'];
      $numLimit = $data['numLimit'];

      if ($user_role == 1 || $user_role == 2) {

        $sql = "SELECT notification.user_uuid, notification.uuid, notification.type, notification.action, notification.added_date, notification.status, user.fullname FROM notifications notification INNER JOIN users user ON notification.user_uuid = user.user_uuid
        WHERE notification.status=:status ORDER BY notification.added_date DESC LIMIT ".$start.",".$numLimit."";
        $query = $conn->prepare($sql);
        $query->bindParam(":status", $active);
        $query->execute();

        if ($query->rowCount() > 0) {

          $sql3 = "SELECT COUNT(*) FROM notifications WHERE status=:status";
          $query3 = $conn->prepare($sql3);
          $query3->bindParam(':status', $active);
          $query3->execute();

          $allData = $query->fetchAll();

          $totalOverallCount = $query3->fetch();

          $returnvalue = new getNotificationsClass();
          $returnvalue->engineMessage = 1;
          $returnvalue->re_data = $allData;
          $returnvalue->totalCount = $totalOverallCount[0];
        }
        else {
          $returnvalue = new getNotificationsClass();
          $returnvalue->noData = 2;
        }

      }
      else {

        $sql = "SELECT notification.user_uuid, notification.uuid, notification.type, notification.action, notification.added_date, notification.status, user.fullname FROM notifications notification INNER JOIN users user ON notification.user_uuid = user.user_uuid
        WHERE notification.user_uuid=:user_uuid AND notification.status=:status ORDER BY notification.added_date DESC LIMIT ".$start.",".$numLimit."";
        $query = $conn->prepare($sql);
        $query->bindParam(":user_uuid", $data['user_uuid']);
        $query->bindParam(":status", $active);
        $query->execute();

        if ($query->rowCount() > 0) {

          $sql3 = "SELECT COUNT(*) FROM notifications WHERE user_uuid=:user_uuid AND status=:status";
          $query3 = $conn->prepare($sql3);
          $query3->bindParam(':user_uuid', $data['user_uuid']);
          $query3->bindParam(':status', $active);
          $query3->execute();

          $allData = $query->fetchAll();

          $totalOverallCount = $query3->fetch();

          $returnvalue = new getNotificationsClass();
          $returnvalue->engineMessage = 1;
          $returnvalue->re_data = $allData;
          $returnvalue->totalCount = $totalOverallCount[0];
        }
        else {
          $returnvalue = new getNotificationsClass();
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
