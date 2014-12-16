<?php

class BaseServices extends Phalcon\Mvc\Controller
{
    //public $dispatcher  = \Phalcon\Mvc\Dispatcher;
    //public $response    = \Phalcon\Http\Response;
    
    public function initialize()
    {    
      //  $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
    }
    
    //Set JSON-Response when route was executed
    /*public function afterExecuteRoute()
    {
		//get data from action
        $data = $dispatcher->getReturnedValue();
        
		//json encode if necessary
		if (is_array($data)) {
            $data = json_encode($data);
        }
		
		//set headers and data to json response
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent($data);
		
		//return response
		return $response->send();
    }*/
    
}