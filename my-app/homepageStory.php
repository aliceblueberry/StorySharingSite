re '/home/hanruizou/public_html/mongodb/vendor/autoload.php';
header("Content-Type: application/json");


$client = new MongoDB\Client('mongodb://localhost:27017');

$db = $client -> reactDB;

$results = $db -> story -> find(array());

$data["stories"] = iterator_to_array($results);

$data["success"] = true;

echo json_encode($data);
exit;

 ?>

