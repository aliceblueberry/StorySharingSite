re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);

      $title = $json_obj['title'];
      $newCnt = $json_obj['newCnt'];
      $author = $json_obj['author'];
      $content = $json_obj['content'];

      $newData = array('$set'=>array('cmt'=>$cmt));

      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> story -> deleteOne(array('title'=> $title));

      $db -> story -> insertOne(array('author'=>$author,'title'=> $title,'content'=>$newCnt));

      echo json_encode(array(
        "success" => true
      ));
      exit;
 ?>

