<?php
header('Access-Control-Allow-Origin: *');

//Test Params as array()
$tags = array(
    '-- choose tag --',
    'hallo',
    'welt',
    'dorsch'
);

//Output transformed Response
echo json_encode($tags);