<?php

   require 'connect.php';

   class getUsersClass {
     public $engineMessage = 0;
     public $noData = 0;
     public $re_data;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       $active = 1;
       $user_role_super = 1;

       $sql = "SELECT user.user_uuid, user.edit_user_uuid, user.user_role, user.username, user.email, user.fullname, user.gender, user.phone_number, user.added_date, user.last_modified, user.access, user.status, add_user.fullname as added_fullname FROM users user INNER JOIN users add_user ON user.edit_user_uuid = add_user.user_uuid WHERE user.user_role!=:user_role ORDER BY user.added_date DESC";

       $query = $conn->prepare($sql);
       $query->bindParam(":user_role", $user_role_super);
       $query->execute();

       if ($query->rowCount() > 0) {

         $all_users = $query->fetchAll();

         $returnvalue = new getUsersClass();
         $returnvalue->engineMessage = 1;
         $returnvalue->re_data = $all_users;
       }
       else {
         $returnvalue = new getUsersClass();
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
