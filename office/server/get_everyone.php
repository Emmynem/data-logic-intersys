<?php

   require 'connect.php';

   class getPeopleClass {
     public $engineMessage = 0;
     public $noData = 0;
     public $re_data;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       $active = 1;

       $sql = "SELECT people.uuid, people.category as category_uuid, category.category, category.stripped, people.serial_number, people.code, people.firstname, people.middlename, people.lastname, people.email, people.phone_number, people.gender,
        people.part, people.choir, people.zone, people.area, people.state, people.nation, people.authenticated, people.added_date, people.last_modified, people.status FROM people INNER JOIN categories category ON people.category = category.uuid WHERE people.status=:status ORDER BY people.added_date DESC";

       $query = $conn->prepare($sql);
       $query->bindParam(":status", $active);
       $query->execute();

       if ($query->rowCount() > 0) {

         $everyone = $query->fetchAll();

         $returnvalue = new getPeopleClass();
         $returnvalue->engineMessage = 1;
         $returnvalue->re_data = $everyone;
       }
       else {
         $returnvalue = new getPeopleClass();
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
