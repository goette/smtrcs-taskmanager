<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$name = $_POST["name"];
$content = file_get_contents("../../../page_configs/" . $name . ".json");

echo $content;