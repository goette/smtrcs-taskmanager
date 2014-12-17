<?php
/**
 * Controller to handle API Requests
 *
 * @version 1, 2014-10-22, Franziska Hempel,
 * @version 2, 2014-11-20, Martin Götte, allow cross domain requests from localhost:3000
 */

header('Access-Control-Allow-Origin: *');

class ApiRequest
{
	//URL of Live Proxy
	private static $proxy = 'http://proxy-seo-search.unbelievable-machine.net:6081/stable/ProxyService/public/Proxy/';
	
	
	/**
	 * Perform GET Request
	 * 
	 * @version 1, 2014-10-22, Franziska Hempel
	 * 
	 * @param string $service	Name of Service Endpoint as String
	 * @param array $params		Array of Parameters for Request
	 * 
	 * @return array			Service Response as Array
	 */
	public function get($service, array $params=array())
	{	
		
		$ch = curl_init();
		curl_setopt_array($ch, array(
			CURLOPT_URL => self::$proxy.$service.'?'.http_build_query($params),
			CURLOPT_HTTPHEADER => array('Content-type: application/json'),
            CURLOPT_RETURNTRANSFER => true
		));
		
		$result = curl_exec($ch);
		curl_close($ch);

		return(json_decode(urldecode($result),true));
	}
	
	/**
	 * Perform POST Request
	 * 
	 * @version 1, 2014-10-22, Franziska Hempel
	 * 
	 * @param string $service	Name of Service Endpoint as String
	 * @param array $params		Array of Parameters for Request
	 * 
	 * @return array			Service Response as Array
	 */
	public function post($service, array $params=array())
	{	
		
		$ch = curl_init();
		curl_setopt_array($ch, array(
			CURLOPT_URL => self::$proxy.$service,
			CURLOPT_HTTPHEADER => array('Content-type: application/json'),
			CURLOPT_POST => true,
			CURLOPT_POSTFIELDS => $params,
            CURLOPT_RETURNTRANSFER => true
		));
		
		$result = curl_exec($ch);
		curl_close($ch);

		return(json_decode(urldecode($result),true));
	}
}
?>
