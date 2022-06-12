<?php

   require 'connect.php';

   class unauthenticateByCategoryClass {
     public $engineMessage = 0;
     public $noData = 0;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       date_default_timezone_set("Africa/Lagos");
       $date_added = date("Y-m-d H:i:s");

       $sql2 = "SELECT uuid FROM people WHERE category=:category";
       $query2 = $conn->prepare($sql2);
       $query2->bindParam(":category", $data['category']);
       $query2->execute();

       if ($query2->rowCount() < 0) {

         $returnvalue = new unauthenticateByCategoryClass();
         $returnvalue->noData = 2;

       }
       else {

         $unauthenticated = 0;

         $sql = "UPDATE people SET authenticated=:authenticated, last_modified=:last_modified WHERE category=:category";
         $query = $conn->prepare($sql);
         $query->bindParam(":category", $data['category']);
         $query->bindParam(":authenticated", $unauthenticated);
         $query->bindParam(":last_modified", $date_added);
         $query->execute();

         if ($query) {

           $returnvalue = new unauthenticateByCategoryClass();
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
