<?php

  require 'connect.php';

  class getCountClass{
    public $engineMessage = 0;
    public $totalUsersCount;
    public $totalCheckersCount;
    public $totalCategoryCount;
    public $totalCategoryViewsCount;
    public $totalPeopleCount;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {
    try {
      $conn->beginTransaction();

      $active = 1;

      $sql5 = "SELECT COUNT(*) FROM users";
      $query5 = $conn->prepare($sql5);
      $query5->execute();
      $usersCount = $query5->fetch();

      $sql7 = "SELECT SUM(views) FROM categories";
      $query7 = $conn->prepare($sql7);
      $query7->execute();
      $categoryViewsCount = $query7->fetch();

      $sql8 = "SELECT COUNT(*) FROM categories";
      $query8 = $conn->prepare($sql8);
      $query8->execute();
      $categoriesCount = $query8->fetch();

      $sql9 = "SELECT COUNT(*) FROM people";
      $query9 = $conn->prepare($sql9);
      $query9->execute();
      $peopleCount = $query9->fetch();

      $sql14 = "SELECT COUNT(*) FROM checkers";
      $query14 = $conn->prepare($sql14);
      $query14->execute();
      $checkersCount = $query14->fetch();

      $returnvalue = new getCountClass();
      $returnvalue->engineMessage = 1;
      $returnvalue->totalUsersCount = $usersCount[0];
      $returnvalue->totalCheckersCount = $checkersCount[0];
      $returnvalue->totalCategoryCount = $categoriesCount[0];
      $returnvalue->totalCategoryViewsCount = $categoryViewsCount[0];
      $returnvalue->totalPeopleCount = $peopleCount[0];

      $conn->commit();
    } catch (PDOException $e) {
      $conn->rollback();
      throw $e;
    }

    echo json_encode($returnvalue);
  }

?>
