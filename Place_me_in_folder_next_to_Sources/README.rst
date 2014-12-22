================================
Suite Frontend server definition
================================

**Before continuing, please read all documentation from parent directories, if not already done! This is REQUIRED
to understand some keywords used in this file.**

:Author: Jan Schumann <j.schumann@searchmetrics.com>
:Date: 2013-02-11

.. contents::

Description
-----------

The Suite Proxy Server.

Base Box
--------

- base-ubuntu-server-12.04-r4

Shared Folders
--------------

- Windows
	- c:\www-data\info\ mapped to /var/www/info. SHOULD contain phpinfo, apc stats, memcache stats etc
	- c:\www-data\frontend\ the frontend code
	- c:\www-data\tools\ frontend tools?
	- c:\www-data\lib\ the php libraries

- Unix host folders
	- ~/Development/Sources/info/
	- ~/Development/Sources/frontend/
	- ~/Development/Sources/tools/
	- ~/Development/Sources/lib/

