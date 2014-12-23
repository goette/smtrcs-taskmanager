<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

file_put_contents('../../../page_configs/' . $_POST["name"] . '.json', json_encode($_POST["config"], true));