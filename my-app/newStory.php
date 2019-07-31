re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      ini_set("session.cookie_httponly", 1);
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);
      $username = $json_obj['username'];
      $title = $json_obj['title'];
      $content = $json_obj['content'];



      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> story -> insertOne(array('author'=> $username, 'title'=> $title, 'content'=> $content));


      echo json_encode(array(
        "success" => true
      ));
      exit;
 ?>

