## Dashboard Suite aka. Suite 7

### How to run things

* install latest node, npm & gulp (`sudo npm install -g gulp`)
* switch to this directory
* run `sudo npm install`
* run `gulp`
* open [http://localhost:3000/v1.html](http://localhost:3000/v1.html)
* change something in /scss or /js/components
* don't reload the page - you don't need to (i hope)

---

### Install in vagrant 

* `vagrant ssh`
* `sudo apt-get update`
* we need git: `sudo apt-get install git`
* make sure old nodejs is removed: `sudo apt-get remove nodejs`
* `sudo apt-get install python-software-properties`
* `sudo apt-add-repository ppa:chris-lea/node.js`
* `sudo apt-get update`
* `sudo apt-get install nodejs` (installs nodejs & npm)
* check that nodejs is installed: `node -v` should be greater 0.10.x
* check that npm is installed: `npm -v` should be greater 1.4.x

---

There will be more one day