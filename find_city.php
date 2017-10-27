<?php
@require 'passwords.php';

// Create connection
$conn = new mysqli($servername, $username, $password, "flagoon");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//set correct coding
$conn->set_charset('utf8');
$sql = "SELECT city, coord_lat, coord_lng FROM data WHERE city LIKE '" . $_GET['city'] . "%'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<span class='span-city' aim='$_GET[cont]' value='" . $row['city'] . "'>$row[city], </span> ";
    }
} else {
    echo "<div class='text-warning'>Nie ma takiego miasta, lub zbyt dużo wyników. Popraw się!</div>";
}

$conn->close();
?> 