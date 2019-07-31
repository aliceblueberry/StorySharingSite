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


      $client = new MongoDB\Client('mongodb://localhost:27017');

      $db = $client -> reactDB;

      $userInfo = $db -> users -> findOne(array('name'=> $username));

      if(password_verify($password, $userInfo['password'])){

        ini_set("session.cookie_httponly", 1);
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));

        echo json_encode(array(
          "success" => true
        ));
        exit;
      }else {
        echo json_encode(array(
          "success" => false,
          "message" => "Invalid username or password !"
        ));
        exit;
      }
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

