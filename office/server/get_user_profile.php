<?php

   require 'connect.php';

   class getProfileClass {
     public $engineMessage = 0;
     public $noData = 0;
     public $re_data;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       $sql = "SELECT fullname, gender, phone_number FROM users WHERE user_uuid=:user_uuid";
       $query = $conn->prepare($sql);
       $query->bindParam(":user_uuid", $data['user_uuid']);
       $query->execute();

       if ($query->rowCount() > 0) {

         $allData = $query->fetch();

         $returnvalue = new getProfileClass();
         $returnvalue->engineMessage = 1;
         $returnvalue->re_data = $allData;

       }
       else {
         $returnvalue = new getProfileClass();
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
