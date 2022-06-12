<?php

  require 'connect.php';

  class signupClass {
    public $engineMessage = 0;
    public $alreadyExists = 0;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($connected) {

    try {
      $conn->beginTransaction();

      date_default_timezone_set("Africa/Lagos");
      $date_added = date("Y-m-d H:i:s");

      $active = 1;

      $hybrid_uuid = "";

      function uuid_gen() {
        $alpha = md5(rand(100,200));
        $beta = str_shuffle($alpha);
        $omega = str_split($beta, 9);

        $GLOBALS['hybrid_uuid'] = strtolower("p".$omega[1]);
      }

      uuid_gen();

      // $category = "Travel";
      $unauthenticated = 0;

      $sql2 = "SELECT uuid FROM people WHERE category=:category AND status=:status";
      $query2 = $conn->prepare($sql2);
      $query2->bindParam(":category", $data['category']);
      $query2->bindParam(":status", $active);
      $query2->execute();

      if ($query2->rowCount() > 0) {
        $sql3 = "SELECT serial_number FROM people WHERE category=:category AND status=:status ORDER BY added_date DESC LIMIT 1";
        $query3 = $conn->prepare($sql3);
        $query3->bindParam(":category", $data['category']);
        $query3->bindParam(":status", $active);
        $query3->execute();

        if ($query3->rowCount() > 0) {
          $sql4 = "SELECT category FROM people WHERE category=:category AND (email=:email OR phone_number=:phone_number) AND status=:status ORDER BY added_date DESC LIMIT 1";
          $query4 = $conn->prepare($sql4);
          $query4->bindParam(":category", $data['category']);
          $query4->bindParam(":email", $data['email']);
          $query4->bindParam(":phone_number", $data['phone_number']);
          $query4->bindParam(":status", $active);
          $query4->execute();

          if ($query4->rowCount() > 0) {
            $data_to_delete = $data['path_to_delete'];

            $dir = $_SERVER['DOCUMENT_ROOT']."/chuks_project";
            unlink($dir."/".$data_to_delete);
            $returnvalue = new signupClass();
            $returnvalue->alreadyExists = 2;
          }
          else {
            $old_serial_number = $query3->fetch()[0];
            $old_serial_number_int = (int) $old_serial_number;
            $new_serial_number_int = $old_serial_number_int + 1;
            $new_serial_number = "00".$new_serial_number_int;

            $signup_in_category_code = $data['code'].$new_serial_number;

            $sql = "INSERT INTO people (uuid, category, serial_number, code, firstname, middlename, lastname, email, phone_number, gender, part, choir, zone, area, state, nation, image, file, file_size, authenticated, added_date, last_modified, status)
            VALUES (:uuid, :category, :serial_number, :code, :firstname, :middlename, :lastname, :email, :phone_number, :gender, :part, :choir, :zone, :area, :state, :nation, :image, :file, :file_size, :authenticated, :added_date, :last_modified, :status)";
            $query = $conn->prepare($sql);
            $query->bindParam(":uuid", $hybrid_uuid);
            $query->bindParam(":category", $data['category']);
            $query->bindParam(":serial_number", $new_serial_number);
            $query->bindParam(":code", $signup_in_category_code);
            $query->bindParam(":firstname", $data['firstname']);
            $query->bindParam(":middlename", $data['middlename']);
            $query->bindParam(":lastname", $data['lastname']);
            $query->bindParam(":email", $data['email']);
            $query->bindParam(":phone_number", $data['phone_number']);
            $query->bindParam(":gender", $data['gender']);
            $query->bindParam(":part", $data['part']);
            $query->bindParam(":choir", $data['choir']);
            $query->bindParam(":zone", $data['zone']);
            $query->bindParam(":area", $data['area']);
            $query->bindParam(":state", $data['state']);
            $query->bindParam(":nation", $data['nation']);
            $query->bindParam(":image", $data['image']);
            $query->bindParam(":file", $data['file']);
            $query->bindParam(":file_size", $data['file_size']);
            $query->bindParam(":authenticated", $unauthenticated);
            $query->bindParam(":added_date", $date_added);
            $query->bindParam(":last_modified", $date_added);
            $query->bindParam(":status", $active);
            $query->execute();

            if ($query) {

              $returnvalue = new signupClass();
              $returnvalue->engineMessage = 1;

            }
          }
        }
        else {
          $sql4 = "SELECT category FROM people WHERE category=:category AND (email=:email OR phone_number=:phone_number) AND status=:status ORDER BY added_date DESC LIMIT 1";
          $query4 = $conn->prepare($sql4);
          $query4->bindParam(":category", $data['category']);
          $query4->bindParam(":email", $data['email']);
          $query4->bindParam(":phone_number", $data['phone_number']);
          $query4->bindParam(":status", $active);
          $query4->execute();

          if ($query4->rowCount() > 0) {
            $data_to_delete = $data['path_to_delete'];

            $dir = $_SERVER['DOCUMENT_ROOT']."/chuks_project";
            unlink($dir."/".$data_to_delete);
            $returnvalue = new signupClass();
            $returnvalue->alreadyExists = 2;
          }
          else {
            $first_signup_in_category = "001";
            $first_signup_in_category_code = $data['code'].$first_signup_in_category;

            $sql = "INSERT INTO people (uuid, category, serial_number, code, firstname, middlename, lastname, email, phone_number, gender, part, choir, zone, area, state, nation, image, file, file_size, authenticated, added_date, last_modified, status)
            VALUES (:uuid, :category, :serial_number, :code, :firstname, :middlename, :lastname, :email, :phone_number, :gender, :part, :choir, :zone, :area, :state, :nation, :image, :file, :file_size, :authenticated, :added_date, :last_modified, :status)";
            $query = $conn->prepare($sql);
            $query->bindParam(":uuid", $hybrid_uuid);
            $query->bindParam(":category", $data['category']);
            $query->bindParam(":serial_number", $first_signup_in_category);
            $query->bindParam(":code", $first_signup_in_category_code);
            $query->bindParam(":firstname", $data['firstname']);
            $query->bindParam(":middlename", $data['middlename']);
            $query->bindParam(":lastname", $data['lastname']);
            $query->bindParam(":email", $data['email']);
            $query->bindParam(":phone_number", $data['phone_number']);
            $query->bindParam(":gender", $data['gender']);
            $query->bindParam(":part", $data['part']);
            $query->bindParam(":choir", $data['choir']);
            $query->bindParam(":zone", $data['zone']);
            $query->bindParam(":area", $data['area']);
            $query->bindParam(":state", $data['state']);
            $query->bindParam(":nation", $data['nation']);
            $query->bindParam(":image", $data['image']);
            $query->bindParam(":file", $data['file']);
            $query->bindParam(":file_size", $data['file_size']);
            $query->bindParam(":authenticated", $unauthenticated);
            $query->bindParam(":added_date", $date_added);
            $query->bindParam(":last_modified", $date_added);
            $query->bindParam(":status", $active);
            $query->execute();

            if ($query) {

              $returnvalue = new signupClass();
              $returnvalue->engineMessage = 1;

            }
          }

        }

      }
      else {

        $sql4 = "SELECT category FROM people WHERE category=:category AND (email=:email OR phone_number=:phone_number) AND status=:status ORDER BY added_date DESC LIMIT 1";
        $query4 = $conn->prepare($sql4);
        $query4->bindParam(":category", $data['category']);
        $query4->bindParam(":email", $data['email']);
        $query4->bindParam(":phone_number", $data['phone_number']);
        $query4->bindParam(":status", $active);
        $query4->execute();

        if ($query4->rowCount() > 0) {
          $data_to_delete = $data['path_to_delete'];

          $dir = $_SERVER['DOCUMENT_ROOT']."/chuks_project";
          unlink($dir."/".$data_to_delete);
          $returnvalue = new signupClass();
          $returnvalue->alreadyExists = 2;
        }
        else {
          $first_signup_in_category = "001";
          $first_signup_in_category_code = $data['code'].$first_signup_in_category;

          $sql = "INSERT INTO people (uuid, category, serial_number, code, firstname, middlename, lastname, email, phone_number, gender, part, choir, zone, area, state, nation, image, file, file_size, authenticated, added_date, last_modified, status)
          VALUES (:uuid, :category, :serial_number, :code, :firstname, :middlename, :lastname, :email, :phone_number, :gender, :part, :choir, :zone, :area, :state, :nation, :image, :file, :file_size, :authenticated, :added_date, :last_modified, :status)";
          $query = $conn->prepare($sql);
          $query->bindParam(":uuid", $hybrid_uuid);
          $query->bindParam(":category", $data['category']);
          $query->bindParam(":serial_number", $first_signup_in_category);
          $query->bindParam(":code", $first_signup_in_category_code);
          $query->bindParam(":firstname", $data['firstname']);
          $query->bindParam(":middlename", $data['middlename']);
          $query->bindParam(":lastname", $data['lastname']);
          $query->bindParam(":email", $data['email']);
          $query->bindParam(":phone_number", $data['phone_number']);
          $query->bindParam(":gender", $data['gender']);
          $query->bindParam(":part", $data['part']);
          $query->bindParam(":choir", $data['choir']);
          $query->bindParam(":zone", $data['zone']);
          $query->bindParam(":area", $data['area']);
          $query->bindParam(":state", $data['state']);
          $query->bindParam(":nation", $data['nation']);
          $query->bindParam(":image", $data['image']);
          $query->bindParam(":file", $data['file']);
          $query->bindParam(":file_size", $data['file_size']);
          $query->bindParam(":authenticated", $unauthenticated);
          $query->bindParam(":added_date", $date_added);
          $query->bindParam(":last_modified", $date_added);
          $query->bindParam(":status", $active);
          $query->execute();

          if ($query) {

            $returnvalue = new signupClass();
            $returnvalue->engineMessage = 1;

          }
        }

      }

      $conn->commit();
    } catch (PDOException $e) {
    $conn->rollback();
    throw $e;
    }

    echo json_encode($returnvalue);

  }

?>
