<?php

   require 'connect.php';

   class editCategoryClass {
     public $engineMessage = 0;
     public $alreadyExists = 0;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       date_default_timezone_set("Africa/Lagos");
       $date_added = date("Y-m-d H:i:s");

       $sql2 = "SELECT uuid FROM categories WHERE (category=:category OR stripped=:stripped)";
       $query2 = $conn->prepare($sql2);
       $query2->bindParam(":category", $data['category']);
       $query2->bindParam(":stripped", $data['stripped']);
       $query2->execute();

       if ($query2->rowCount() > 0) {

         $returnvalue = new editCategoryClass();
         $returnvalue->alreadyExists = 2;

       }
       else {

         $sql = "UPDATE categories SET edit_user_uuid=:edit_user_uuid, category=:category, stripped=:stripped, last_modified=:last_modified WHERE uuid=:uuid";
         $query = $conn->prepare($sql);
         $query->bindParam(":edit_user_uuid", $data['edit_user_uuid']);
         $query->bindParam(":uuid", $data['uuid']);
         $query->bindParam(":category", $data['category']);
         $query->bindParam(":stripped", $data['stripped']);
         $query->bindParam(":last_modified", $date_added);
         $query->execute();

         if ($query) {

           $returnvalue = new editCategoryClass();
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
