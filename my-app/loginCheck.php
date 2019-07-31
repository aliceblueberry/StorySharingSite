ni_set("session.cookie_httponly", 1);
header("Content-Type: application/json");
session_start();

if(isset($_SESSION["username"])){
    echo json_encode(array(
      "loggedIn" => true,
      "username" => $_SESSION["username"]
    ));
  exit;
}else {
  echo json_encode(array(
    "loggedIn" => false,
    "username" => "Log in first !"
  ));
  exit;
}


 ?>

