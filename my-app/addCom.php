re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);
      $author = $json_obj['author'];
      $title = $json_obj['title'];
      $content = $json_obj['content'];
      $comment = $json_obj['comment'];
      $commenter = $json_obj['commenter'];

      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> story -> insertOne(array('author'=> $author, 'title'=> $title, 'content' => $content, 'comment' => $comment, 'commenter' => $commenter));

      echo json_encode(array(
        "success" => true
      ));
      exit;
 ?>

