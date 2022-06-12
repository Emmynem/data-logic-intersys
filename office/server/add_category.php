<?php

  require 'connect.php';

  class addCategoryClass {
    public $engineMessage = 0;
    public $alreadyExists = 0;
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

        $GLOBALS['hybrid_uuid'] = strtolower("c".$omega[1]);
      }

      uuid_gen();

      // $category = "Travel";
      $views_count = 0;

      $sql2 = "SELECT uuid FROM categories WHERE (category=:category OR stripped=:stripped) AND status=:status";
      $query2 = $conn->prepare($sql2);
      $query2->bindParam(":category", $data['category']);
      $query2->bindParam(":stripped", $data['stripped']);
      $query2->bindParam(":status", $active);
      $query2->execute();

      if ($query2->rowCount() > 0) {
        $returnvalue = new addCategoryClass();
        $returnvalue->alreadyExists = 2;

      }
      else {

        $sql = "INSERT INTO categories (user_uuid, edit_user_uuid, uuid, category, stripped, views, added_date, last_modified, status)
        VALUES (:user_uuid, :edit_user_uuid, :uuid, :category, :stripped, :views, :added_date, :last_modified, :status)";
        $query = $conn->prepare($sql);
        $query->bindParam(":user_uuid", $data['user_uuid']);
        $query->bindParam(":edit_user_uuid", $data['edit_user_uuid']);
        $query->bindParam(":uuid", $hybrid_uuid);
        $query->bindParam(":category", $data['category']);
        $query->bindParam(":stripped", $data['stripped']);
        $query->bindParam(":views", $views_count);
        $query->bindParam(":added_date", $date_added);
        $query->bindParam(":last_modified", $date_added);
        $query->bindParam(":status", $active);
        $query->execute();

        if ($query) {

          $returnvalue = new addCategoryClass();
          $returnvalue->engineMessage = 1;

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
