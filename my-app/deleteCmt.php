re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);


      $cmt = $json_obj['cmt'];

      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> cmts -> deleteOne(array('cmt'=> $cmt));
      echo json_encode(array(
        "success" => true
      ));
      exit;
 ?>

