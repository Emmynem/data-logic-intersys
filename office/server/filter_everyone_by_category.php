<?php

  require 'connect.php';

  class getFilteredDataClass {
    public $engineMessage = 0;
    public $noData = 0;
    public $filteredData;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {

    try {
      $conn->beginTransaction();

      $table = $data['table'];

      $active = 1;

      $sql = "SELECT people.uuid, category.category, category.stripped, people.serial_number, people.code, people.firstname, people.middlename, people.lastname, people.email, people.phone_number, people.gender,
       people.part, people.choir, people.zone, people.area, people.state, people.nation, people.authenticated, people.added_date, people.last_modified, people.status FROM people
       INNER JOIN categories category ON people.category = category.uuid WHERE people.category=:category AND people.status=:status
       ORDER BY people.added_date DESC";
      $query = $conn->prepare($sql);
      $query->bindParam(':category', $data['category']);
      $query->bindParam(':status', $active);
      $query->execute();

      if ($query->rowCount() > 0) {
        $allData = $query->fetchAll();

        $returnvalue = new getFilteredDataClass();
        $returnvalue->engineMessage = 1;
        $returnvalue->filteredData = $allData;

      }
      else {
        $returnvalue = new getFilteredDataClass();
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
