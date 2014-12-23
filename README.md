## Suite 7

### Ubuntu

* Install latest node & npm
    * Make sure old nodejs is removed: `sudo apt-get remove nodejs`
    * `sudo apt-get update`
    * `sudo apt-get install python-software-properties`
    * `sudo apt-add-repository ppa:chris-lea/node.js`
    * `sudo apt-get install nodejs` (installs nodejs & npm)
* Install gulp: `sudo npm install -g gulp`
* Check that nodejs is installed: `node -v` should be greater 0.10.x
* Check that npm is installed: `npm -v` should be greater 1.4.x
* Switch to this directory (suite7)
* `sudo npm install`
* `gulp`

---

### Windows

* Install node.js & npm: 
    * Download [latest version](http://nodejs.org/download/), 64bit, msi
* Install [Python v2.7.3](http://www.python.org/download/releases/2.7.3#download)
* Install [Visual Studio 2012 Express](http://go.microsoft.com/?linkid=9816758)
* Open CMD and install gulp: `npm install -g gulp`
* Switch to this directory (suite7)
* `npm install --msvs_version=2012`
* `gulp`

---

### Livereload

* You need the browser extension for livereload which can be downloaded here:
    * [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
    * [Firefox](http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi)
    * [Safari](http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz)

