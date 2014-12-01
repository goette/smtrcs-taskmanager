<?php

//Report all errors
error_reporting(E_ALL);

try
{
    //Read the config file
	require __DIR__ . '/../app/config/config.php';

    //Register a set of directories with the Autoloader
	$loader = new \Phalcon\Loader();
	$loader->registerDirs(
		array(
			__DIR__.$config->phalcon->controllersDir,
			__DIR__.$config->phalcon->libraryDir
		)
	)->register();

	//Setup the FactoryDefault Dependency Injector
	$di = new \Phalcon\DI\FactoryDefault();
    
    //Load Router
	$di->set('router', function(){
		require __DIR__ . '/../app/config/router.php';
		return $router;
	});
    
    //Generate all kind of urls in the application
	$di->set('url', function() use ($config){
		$url = new \Phalcon\Mvc\Url();
		$url->setBaseUri($config->phalcon->baseUri);
		return $url;
	});
    
    //Start the session the first time some component request the session service
	$di->set('session', function(){
		$session = new Phalcon\Session\Adapter\Files();
		$session->start();
		return $session;
	});
    
    //Setup View Service
	$di->set('view', function() use ($config) {
		$view = new \Phalcon\Mvc\View();
		$view->setViewsDir(__DIR__.$config->phalcon->viewsDir);
		return $view;
	});
    
    $application = new \Phalcon\Mvc\Application();
	$application->setDI($di);
	echo $application->handle()->getContent();
    
}
catch (Phalcon\Exception $e)
{
	echo $e->getMessage();
}
catch (PDOException $e)
{
	echo $e->getMessage();
}