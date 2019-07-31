re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      ini_set("session.cookie_httponly", 1);
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);
      $title = $json_obj['title'];
      $cmt= $json_obj['cmt'];
      $cmter= $json_obj['cmter'];


      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> cmts -> insertOne(array('title'=> $title, 'cmt'=> $cmt, 'cmter'=> $cmter));


      echo json_encode(array(
        "success" => true
      ));
      exit;
 ?>

