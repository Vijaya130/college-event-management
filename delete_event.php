<?php
include 'connect.php';

$id = $_GET['id'];

$conn->query("DELETE FROM events WHERE event_id=$id");

echo json_encode(["message" => "Deleted"]);
?>