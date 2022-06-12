<?php

  require 'connect.php';

  class deleteOldBackgroundImageClass {
    public $engineMessage = 0;
  }

  $data = json_decode(file_get_contents("php://input"),true);

  if ($connected) {

    try {
      $conn->beginTransaction();

      // $sql = "SELECT bg_image from posts WHERE uuid=:uuid";
      // $query = $conn->prepare($sql);
      // $query->bindParam(":uuid", $data['uuid']);
      // $query->execute();
      // $img_to_delete = $query->fetch();

      $img_to_delete = $data['old_image'];

      // $data = $img_to_delete[0];
      $data = $img_to_delete;
      $dir = $_SERVER['DOCUMENT_ROOT']."/chuks_project";
      unlink($dir."/".$data);

      $returnvalue = new deleteOldBackgroundImageClass();
      $returnvalue->engineMessage = 1;

      $conn->commit();
    } catch (PDOException $e) {
      $conn->rollback();
      throw $e;
    }

    echo json_encode($returnvalue);
  }

?>
