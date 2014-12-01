<?php

$router = new Phalcon\Mvc\Router();

//route to controllers within namespace services
$router->add('/services/:controller/:action', array(
    'namespace' => 'services',
    'controller' => 1,
    'action' => 2
))->convert('action', function($action) {
    //convert action names to camelCase 
    return Phalcon\Text::camelize($action);
});

//route to controllers within namespace views
$router->add('/:controller/:action', array(
    'namespace' => 'views',
    'controller' => 1,
    'action' => 2
))->convert('action', function($action) {
    //convert action names to camelCase 
    return Phalcon\Text::camelize($action);
});

//route index
$router->add('/', array(
    'namespace' => 'views',
    'controller' => 'index',
    'action' => 'index'
))->convert('action', function($action) {
    //convert action names to camelCase 
    return Phalcon\Text::camelize($action);
});