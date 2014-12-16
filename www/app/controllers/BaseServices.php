<?php
use Phalcon\Mvc\View;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\Response;

class BaseServices extends Phalcon\Mvc\Controller
{
	
    public function initialize()
    {    
        //Don't render Views for Service Calls
		$this->view->setRenderLevel(View::LEVEL_NO_RENDER);
    }
    
    //Set JSON-Response when route was executed
    public function afterExecuteRoute()
    {
		//get returned data
        $data = $this->dispatcher->getReturnedValue();
        
		//json_encode data if necessary
		if (is_array($data)) {
            $data = json_encode($data);
        }
		
		//set headers and content of json-response
        $this->response->setContentType('application/json', 'UTF-8');
        $this->response->setContent($data);
        
		//return response
        return $this->response->send();
    }
    
}