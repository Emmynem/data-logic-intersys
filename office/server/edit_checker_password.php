<?php

   require 'connect.php';

   class editCheckerPasswordClass {
     public $engineMessage = 0;
     public $noData = 0;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       date_default_timezone_set("Africa/Lagos");
       $date_added = date("Y-m-d H:i:s");

       $sql2 = "SELECT * FROM checkers WHERE user_uuid=:user_uuid";
       $query2 = $conn->prepare($sql2);
       $query2->bindParam(":user_uuid", $data['user_uuid']);
       $query2->execute();

       if ($query2->rowCount() > 0) {

         $password = $data['password'];

         function cus_salt(){
          $david = md5(rand(100, 200));
          return $david;
        }

        $options = [
  
          'cost' => 12
        ];

        $lash = password_hash($password, PASSWORD_DEFAULT, $options);

         $sql = "UPDATE checkers SET edit_user_uuid=:edit_user_uuid, password=:password, last_modified=:last_modified WHERE user_uuid=:user_uuid";
         $query = $conn->prepare($sql);
         $query->bindParam(":edit_user_uuid", $data['edit_user_uuid']);
         $query->bindParam(":user_uuid", $data['user_uuid']);
         $query->bindParam(":password", $lash);
         $query->bindParam(":last_modified", $date_added);
         $query->execute();

         if ($query) {

           $returnvalue = new editCheckerPasswordClass();
           $returnvalue->engineMessage = 1;

         }

       }
       else {

         $returnvalue = new editCheckerPasswordClass();
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
