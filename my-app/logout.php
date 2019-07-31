ni_set("session.cookie_httponly", 1);
header("Content-Type: application/json");
session_start();
$user = $_SESSION['username'];
if(session_destroy()){
  echo json_encode(array(
    "success" => true
  ));
  exit;
}else {
  echo json_encode(array(
    "success" => false,
    "message" => "logout failed somehow !"
  ));
  exit;
}


 ?>

