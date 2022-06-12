<?php

  $data = json_decode(file_get_contents("php://input"), true);

  date_default_timezone_set("Africa/Lagos");
  $date_added = date("Y-m-d H:i:s");

  $hybrid_uuid_2 = "";

  function uuid_gen_2() {
    $alpha = md5(rand(100,200));
    $beta = str_shuffle($alpha);
    $omega = str_split($beta, 9);

    $GLOBALS['hybrid_uuid_2'] = strtoupper("S".$omega[1]);
  }

  uuid_gen_2();

  $new_file_name = $hybrid_uuid_2." ".$date_added.".xls";

  // Filter Data
  function filterData(&$str) {
    $str = preg_replace("/\t/", "\\t", $str);
    $str = preg_replace("/\r?\n/", "\\n", $str);
    if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"';
  }

  // File Name & Content Header For Download
  $file_name = $new_file_name;
  header("Content-Disposition: attachment; filename=\"$file_name\"");
  header("Content-Type: application/vnd.ms-excel");

  //To define column name in first row.
  $column_names = false;
  // run loop through each row in $data['content']
  foreach($data['content'] as $row) {
    if(!$column_names) {
      foreach(array_keys($row) as $column){
        if(!is_int($column)){
          echo "\t".$column. "\t";
          $column_names = true;
        }
      }
      echo "\n";
      // if(is_int($row)){
      // }
    }
    // The array_walk() function runs each array element in a user-defined function.
    array_walk($row, 'filterData');
    echo implode("\t", array_values($row)) . "\n";
  }
  exit;

?>
