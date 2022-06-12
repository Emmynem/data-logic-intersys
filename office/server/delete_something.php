<?php

  require 'connect.php';

  class deleteSomethingClass {
    public $engineMessage = 0;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {

    $data_received = $data['image'];
    $dir = $_SERVER['DOCUMENT_ROOT']."/chuks_project";
    unlink($dir."/".$data_received);

    $returnvalue = new deleteSomethingClass();
    $returnvalue->engineMessage = 1;

    echo json_encode($returnvalue);

  }

?>
