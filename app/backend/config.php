<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "ams_test_db";
$port = "3306";

$conn = new mysqli($host, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
