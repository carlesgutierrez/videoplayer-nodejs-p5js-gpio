#Proyecto Cabinas

##Install Ubuntu 20.03

###config ubuntu
 sudo apt update
 deactivate ScreenSaver
 activate user autologin 
 create folder Develop at Home
 open terminal 
 cd Develop
 git clone thisRepo
 install ubuntu updates anb deactivate all automatic updates and advices if required

###Install  SW

 - sudo apt install openssh-server
 - sudo systemctl start ssh
 - sudo systemctl status ssh
 - ip addr show
 
 Note: Now your are able to connect via ssh / putty / winSCP ... using this local ip from another computer in the same local network.

 Use winSCP to move 2 videos ( movie1.webm and movie2.webm ) into the public/assets/ folder
 
 
 
 
 sudo apt-get install libgpiod2a
 sudo apt install gpiod libgpiod-dev libgpiod-doc libnode-dev
 npm install node-libgpiod
 gpiomon --num-events=1 --quiet GPIO27
 gpioget 4 27
 npm install socket.io@2.4.0 ( no forzar nada )

###AutoStart

 Add 2 scripts ( .sh ) into ububtu start apps
