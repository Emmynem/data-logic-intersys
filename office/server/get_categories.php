<?php

   require 'connect.php';

   class getCategoriesClass {
     public $engineMessage = 0;
     public $noData = 0;
     public $re_data;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       $sql = "SELECT categories.user_uuid, categories.edit_user_uuid, categories.uuid, categories.category, categories.stripped, categories.added_date, categories.last_modified, categories.status, users.fullname as added_fullname
       FROM categories INNER JOIN users ON categories.user_uuid = users.user_uuid ORDER BY categories.added_date DESC";
       $query = $conn->prepare($sql);
       $query->execute();

       if ($query->rowCount() > 0) {

         $all_categories = $query->fetchAll();

         $returnvalue = new getCategoriesClass();
         $returnvalue->engineMessage = 1;
         $returnvalue->re_data = $all_categories;
       }
       else {
         $returnvalue = new getCategoriesClass();
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
