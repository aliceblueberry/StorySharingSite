re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);

      $newPwd = $json_obj['newPwd'];
      $username = $json_obj['username'];
      $newUsername = $json_obj['newUsername'];

      //username sanitize
      if( !preg_match('/^[\w_\-]+$/', $newUsername) ){
        echo json_encode(array(
      		"success" => false,
      		"message" => "Invalid username!"
      	));
        exit;
      }
      //password sanitize
      if($newPwd == ""){
        echo json_encode(array(
      		"success" => false,
      		"message" => "Empty password!"
      	));
        exit;
      }

      //hash password
      $hashed_pwd = password_hash($newPwd, PASSWORD_DEFAULT);

      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> users -> deleteOne(array('name'=> $username));

      $db -> users -> insertOne(array('name'=>$newUsername,'password'=> $hashed_pwd));

      echo json_encode(array(
        "success" => true
      ));
      exit;
 ?>

