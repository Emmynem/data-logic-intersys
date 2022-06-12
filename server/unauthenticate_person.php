<?php

   require 'connect.php';

   class unauthenticatePersonClass {
     public $engineMessage = 0;
     public $noData = 0;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       date_default_timezone_set("Africa/Lagos");
       $date_added = date("Y-m-d H:i:s");

       $sql2 = "SELECT * FROM people WHERE uuid=:uuid";
       $query2 = $conn->prepare($sql2);
       $query2->bindParam(":uuid", $data['uuid']);
       $query2->execute();

       if ($query2->rowCount() > 0) {

         $unauthenticated = false;

         $sql = "UPDATE people SET authenticated=:authenticated, last_modified=:last_modified WHERE uuid=:uuid";
         $query = $conn->prepare($sql);
         $query->bindParam(":authenticated", $unauthenticated);
         $query->bindParam(":uuid", $data['uuid']);
         $query->bindParam(":last_modified", $date_added);
         $query->execute();

         if ($query) {
           $returnvalue = new unauthenticatePersonClass();
           $returnvalue->engineMessage = 1;
         }

       }
       else {

         $returnvalue = new unauthenticatePersonClass();
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
