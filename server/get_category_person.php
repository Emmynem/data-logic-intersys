<?php

   require 'connect.php';

   class getCategoryPersonClass {
     public $engineMessage = 0;
     public $noData = 0;
     public $re_data;
   }

   $data = json_decode(file_get_contents("php://input"), true);

   if ($connected) {

     try {
       $conn->beginTransaction();

       $active = 1;

       $sql = "SELECT people.uuid, people.category as category_uuid, category.category, people.serial_number, people.code, people.firstname, people.middlename, people.lastname, people.email, people.phone_number, people.gender,
        people.part, people.choir, people.zone, people.area, people.state, people.nation, people.image, people.authenticated FROM people INNER JOIN categories category ON people.category = category.uuid WHERE category.stripped=:stripped AND people.code=:code AND people.status=:status";
       $query = $conn->prepare($sql);
       $query->bindParam(":stripped", $data['stripped']);
       $query->bindParam(":code", $data['code']);
       $query->bindParam(":status", $active);
       $query->execute();

       if ($query->rowCount() > 0) {

         $categoryPerson = $query->fetch();

         $returnvalue = new getCategoryPersonClass();
         $returnvalue->engineMessage = 1;
         $returnvalue->re_data = $categoryPerson;
       }
       else {
         $returnvalue = new getCategoryPersonClass();
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
