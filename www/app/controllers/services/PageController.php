<?php namespace services;

class PageController extends \BaseServices
{
	// get page config
    public function getConfigAction()
    {
		return array
		(
			'url'			=> '/rankings-overview',
			'pageFilter'	=> array
			(
				'roles'		=> array('c','s','e'),
				'blacklist'	=> array()
			),
			'modulesOnPage'	=> array
			(
				array
				(
					'id'	=> 'ChartChannelInsight'
				),
				array
				(
					'id'	=> 'KpiTrafficInsight'
				)
			)
		);
    }
}