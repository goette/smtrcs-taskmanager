<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

//Test Params as array()
$tags = array(
    '-- choose engine --',
    'google de',
    'google us',
    'bing us'
);

//Output transformed Response
echo json_encode($tags);