re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      ini_set("session.cookie_httponly", 1);
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);
      $title = $json_obj['title'];


      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $story = $db -> cmts -> find(array('title'=> $title));

      $data["comments"] = iterator_to_array($story);

      $data["success"] = true;

      echo json_encode($data);
      exit;
 ?>

