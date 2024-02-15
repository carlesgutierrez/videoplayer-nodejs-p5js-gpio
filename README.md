#Proyecto Cabinas

##Install Ubuntu 20.03

###config ubuntu

user: carles

###Install  SW

 sudo apt-get update

	122  sudo apt install chromium-browser -y
	124  chromium-browser
	125  chromium-browser --autoplay-policy=no-user-gesture-required


	ip addr show
	sudo systemctl start ssh
	sudo systemctl status ssh
	sudo apt-install openssh-server
	//sudo apt -y install vdpau-driver-all

	//Crear proyecto
	mkdir nodejs-p5js-gpio
	147  cd nodejs-p5js-gpio/
	148  npm init -y
	149  npm install express p5 onoff
	150  touch app.js
	151  mkdir public
	152  cd public/
	153  touch index.html
	154  touch sketch.js


	sudo apt-get install libgpiod2
	sudo apt install gpiod libgpiod-dev libgpiod-doc libnode-dev
	npm install node-libgpiod
	gpiomon --num-events=1 --quiet GPIO27
	gpioget 4 27
	npm install socket.io@2.4.0 ( no forzar nada )

###AutoStart

 Add 2 scripts ( .sh ) into ububtu start apps