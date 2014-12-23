<?php
//Name of Service Endpoint
$service = 'TrafficDsDomainchannelhistory';

//Test Params as array()
$params = array(
	'user_id'		=> 'cb262ce3fc4ccad516d16c6d5de13a19',
	'project_id'	=> '51245',
	'date_from'	    => '20141109',
	'date_to'	    => '20141213',
	'metric'	    => 'conversion_rate_1',
	'granularity'	=> 'weekly',
	'channels'		=> array(
		'organic',
		'paid',
		'social',
		'direct',
		'referring',
		'other'
	)
);

//Require ApiRequest Class and make API Request
require_once('../../ApiRequest.php');
$api_request = new ApiRequest();
$response = $api_request->get($service,$params);

//Transform Response Data as needed for KPI
/*$transformed_response = array();
if(isset($response['response'])){
	if(isset($response['response'][0]['sum_visibility']))
	{
		$transformed_response['value'] = $response['response'][0]['sum_visibility'];
	}
	if(isset($response['response'][0]['trend']['per']))
	{
		$transformed_response['trend'] = round($response['response'][0]['trend']['per'],2);
	}
}*/

//Output transformed Response
echo json_encode($response);
