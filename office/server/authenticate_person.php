<?php

   require 'connect.php';

   class authenticatePersonClass {
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

         $authenticated = true;

         $sql = "UPDATE people SET authenticated=:authenticated, last_modified=:last_modified WHERE uuid=:uuid";
         $query = $conn->prepare($sql);
         $query->bindParam(":authenticated", $authenticated);
         $query->bindParam(":uuid", $data['uuid']);
         $query->bindParam(":last_modified", $date_added);
         $query->execute();

         if ($query) {
           $returnvalue = new authenticatePersonClass();
           $returnvalue->engineMessage = 1;
         }

       }
       else {

         $returnvalue = new authenticatePersonClass();
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
