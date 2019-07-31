re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);

      $title = $json_obj['title'];
      $newCmt = $json_obj['newCmt'];
      $cmt = $json_obj['cmt'];
      $cmter = $json_obj['cmter'];

      $newData = array('$set'=>array('cmt'=>$cmt));

      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> cmts -> deleteOne(array('cmt'=> $cmt));

      $db -> cmts -> insertOne(array('title'=> $title, 'cmt' => $newCmt, 'cmter'=>$cmter));

      echo json_encode(array(
        "success" => true
      ));
      exit;
 ?>

