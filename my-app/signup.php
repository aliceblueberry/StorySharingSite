re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
      ini_set("session.cookie_httponly", 1);
      header("Content-Type: application/json");
      $json_str = file_get_contents('php://input');
      $json_obj = json_decode($json_str, true);
      $username = $json_obj['username'];
      $password = $json_obj['password'];

      //username sanitize
      if( !preg_match('/^[\w_\-]+$/', $username) ){
        echo json_encode(array(
      		"success" => false,
      		"message" => "Invalid username!"
      	));
        exit;
      }
      //password sanitize
      if($password == ""){
        echo json_encode(array(
      		"success" => false,
      		"message" => "Empty password!"
      	));
        exit;
      }

      //hash password
      $hashed_pwd = password_hash($password, PASSWORD_DEFAULT);

      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $db -> users -> insertOne(array('name'=> $username, 'password'=> $hashed_pwd, 'age' => 25));
      //$results = $db -> users -> find(array());

      //$data = iterator_to_array($results);

      //$data["success"] = true;

      echo json_encode(array(
        "success" => true,
        "username" => $username,
        "password" => $password
      ));
      exit;
 ?>

