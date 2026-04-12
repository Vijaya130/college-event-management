<?php
include 'connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$type = $data['type'];
$date = $data['date'];
$time = $data['time'];
$venue = $data['venue'];
$status = $data['status'];

$sql = "INSERT INTO events (event_name, event_type, event_date, event_time, venue, status)
        VALUES ('$name', '$type', '$date', '$time', '$venue', '$status')";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "event_id" => $conn->insert_id,
        "event_name" => $name,
        "event_type" => $type,
        "event_date" => $date,
        "event_time" => $time,
        "venue" => $venue,
        "status" => $status
    ]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>