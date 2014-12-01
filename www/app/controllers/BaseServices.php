<?php

class BaseServices extends Phalcon\Mvc\Controller
{
    public $dispatcher  = \Phalcon\Mvc\Dispatcher;
    public $response    = \Phalcon\Http\Response;
    
    public function initialize()
    {    
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
    }
    
    //Set JSON-Response when route was executed
    public function afterExecuteRoute()
    {
        $data = $dispatcher->getReturnedValue();
        if (is_array($data)) {
            $data = json_encode($data);
        }
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent($data);
    }
    
}