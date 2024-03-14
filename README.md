#Proyecto Cabinas

##Install Ubuntu 20.03

###config ubuntu
 - sudo apt update
 - deactivate ScreenSaver
 - activate user autologin 
 - create folder Develop at Home
 - open terminal 
 - cd Develop
 - git clone thisRepo
 - install ubuntu updates anb deactivate all automatic updates and advices if required

###Install  SW

 - sudo apt install nodejs
 - sudo apt install openssh-server
 - sudo systemctl start ssh
 - sudo systemctl status ssh
 - ip addr show
 
 Note: Now your are able to connect via ssh / putty / winSCP ... using this local ip from another computer in the same local network.

 - Use winSCP to move 2 videos ( movie1.webm and movie2.webm ) into the public/assets/ folder

## Open ans install nodejs project requirements 
 
##Manually Install libraríes for gpio libraries with nodejs
 - sudo apt install gpiod libgpiod-dev libgpiod-doc libnode-dev
 - sudo apt install npm
 - npm install node-libgpiod
 - gpiomon --num-events=1 --quiet GPIO27
 - gpioget 4 27
 - npm install socket.io@2.4.0 ( do not force nothig )

## Start App

 - node app.js
 - now server is open and listening
 - at firefox : manaual abilitate auto play media content at security --> permisions --> Allow Audio and Video for all
 - open http://localhost:3000 ( you can play and test with mousePressed events to swap between the 2 videos )
###AutoStart

##Interaction
 - Create a circuit button with: pin 27 to 3V3 power sd 
 - ![image](https://github.com/carlesgutierrez/videoplayer-nodejs-p5js-gpio/assets/203877/dbfcf1e3-86c6-45ab-b09a-3314628d0b8b)

## Auto Start App
 Add 2 scripts ( .sh ) into ububtu start apps
  - start server
  - start app
