<?php

   require 'connect.php';

   class getHistoryClass {
     public $engineMessage = 0;
     public $noData = 0;
     public $re_data;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       $active = 1;

       $sql = "SELECT history.type, history.auth_type, history.added_date, history.status, people.uuid, people.category as category_uuid, category.category, category.stripped, people.serial_number, people.code, people.firstname, people.middlename, people.lastname, people.email, people.phone_number, people.gender,
        people.part, people.choir, people.zone, people.area, people.state, people.nation, people.authenticated FROM history RIGHT JOIN categories category ON history.category = category.uuid
        LEFT JOIN people ON history.person = people.uuid WHERE history.category=:category AND history.status=:status ORDER BY history.added_date DESC";

       $query = $conn->prepare($sql);
       $query->bindParam(":category", $data['category']);
       $query->bindParam(":status", $active);
       $query->execute();

       if ($query->rowCount() > 0) {

         $everyone = $query->fetchAll();

         $returnvalue = new getHistoryClass();
         $returnvalue->engineMessage = 1;
         $returnvalue->re_data = $everyone;
       }
       else {
         $returnvalue = new getHistoryClass();
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
