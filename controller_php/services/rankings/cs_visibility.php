<?php
//Name of Service Endpoint
$service = 'RankingsCsVisibility';

//Test Params as array()
$params = array(
	'user_id'		=> '4925bdf59b400b4a10f076d0f1f06fa8',
	'project_id'	=> '268317',
	'domains'		=> array('puls4.com'),
	'se_id'			=> '26'
);

//Require ApiRequest Class and make API Request
require_once('../../ApiRequest.php');
$api_request = new ApiRequest();
$response = $api_request->get($service,$params);

//Transform Response Data as needed for KPI
$transformed_response = array();
if(isset($response['response'])){
	if(isset($response['response'][0]['sum_visibility']))
	{	
		$transformed_response['value'] = $response['response'][0]['sum_visibility'];
	}
	if(isset($response['response'][0]['trend']['per']))
	{	
		$transformed_response['trend'] = round($response['response'][0]['trend']['per'],2);
	}
}

//Output transformed Response
echo json_encode($transformed_response);
