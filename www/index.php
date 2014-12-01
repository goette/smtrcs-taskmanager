<?php

error_reporting(E_ALL);

try
{
  $di = new \Phalcon\DI\FactoryDefault();
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