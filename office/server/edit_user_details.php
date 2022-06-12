<?php

   require 'connect.php';

   class editUserDetailsClass {
     public $engineMessage = 0;
     public $noData = 0;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       date_default_timezone_set("Africa/Lagos");
       $date_added = date("Y-m-d H:i:s");

       $sql2 = "SELECT * FROM users WHERE user_uuid=:user_uuid";
       $query2 = $conn->prepare($sql2);
       $query2->bindParam(":user_uuid", $data['user_uuid']);
       $query2->execute();

       if ($query2->rowCount() > 0) {

         $sql = "UPDATE users SET edit_user_uuid=:edit_user_uuid, user_role=:user_role, fullname=:fullname, gender=:gender, phone_number=:phone_number, access=:access, last_modified=:last_modified WHERE user_uuid=:user_uuid";
         $query = $conn->prepare($sql);
         $query->bindParam(":edit_user_uuid", $data['edit_user_uuid']);
         $query->bindParam(":user_uuid", $data['user_uuid']);
         $query->bindParam(":user_role", $data['user_role']);
         $query->bindParam(":fullname", $data['fullname']);
         $query->bindParam(':gender', $data['gender']);
         $query->bindParam(":phone_number", $data['phone_number']);
         $query->bindParam(":access", $data['access']);
         $query->bindParam(":last_modified", $date_added);
         $query->execute();

         if ($query) {

           $returnvalue = new editUserDetailsClass();
           $returnvalue->engineMessage = 1;

         }

       }
       else {

         $returnvalue = new editUserDetailsClass();
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
