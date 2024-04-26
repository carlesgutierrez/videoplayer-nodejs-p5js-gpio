  # VideoPlayer Switcher for RPI5

## Requirements: RPI5 + Ubuntu 20.03

### Configure Ubuntu
- Run `sudo apt update`
- Deactivate the screensaver
- Enable user auto-login
- Create a 'Develop' folder in Home directory
- Open the terminal
- Change directory to Develop with `cd Develop`
- Clone this repository using `git clone thisRepo`
- Install Ubuntu updates and deactivate all [automatic updates and notifications if required](https://askubuntu.com/questions/1322292/how-do-i-turn-off-automatic-updates-completely-and-for-real)

### Install Software

- Install Node.js with `sudo apt install nodejs`
- Install OpenSSH Server with `sudo apt install openssh-server`
- Start the SSH service with `sudo systemctl start ssh`
- Check SSH service status with `sudo systemctl status ssh`
- Display network information with `ip addr show`

Note: You can now connect via SSH, PuTTY, WinSCP, etc., using this local IP from another computer on the same local network.

- Use WinSCP to transfer two videos (`movie1.webm` and `movie2.webm`) into the `public/assets/` folder

## Open and Install Node.js Project Requirements

## Manually Install Libraries for GPIO with Node.js
- Install required packages with `sudo apt install gpiod libgpiod-dev libgpiod-doc libnode-dev`
- Install NPM with `sudo apt install npm`
- Install node-libgpiod with `npm install node-libgpiod`
- Monitor GPIO27 with `gpiomon --num-events=1 --quiet GPIO27`
- Read GPIO pin value with `gpioget 4 27`
- Install a specific version of socket.io without forcing updates with `npm install socket.io@2.4.0`

### Settings for Firefox
- Firefox will be used to load our site since it performs better on RPI5 than Chrome
- Go to Firefox settings, navigate to Security -> Permissions, and enable Auto-Play for Audio and Video
- Disable this [option](https://www.reddit.com/r/firefox/comments/zlw0ey/is_there_a_way_to_get_rid_popout_this_video/) : media.videocontrols.picture-in-picture.video-toggle-enabled from about:config
- Remove send data to firefox or any updates.

### AutoStart
- Add two scripts to startup:
  - `node app.js` (the server will now be open and listening)
  - Open `http://localhost:3000` in a browser (you can play and test mouse-pressed events to switch between the two videos
 
### Issues with autostart and wayladn -> Set Mouse Jiggle with sudo
  - Wayland It's quite painfull about start and hide mouse automatically. Didn't work to use hiding like [unclutter](https://www.baeldung.com/linux/mouse-cursor-hide) ( may be as a service with sudo permisiions might work, I didn't try it.
  - So to hide mouse I've had to hack ubuntu with mouse jiggler in order to simulate user interaction:
  - I've added visudo permisions to my user to be able to cal mouse jiggle script with sudo permisions and no pass: "cabina2 ALL=(ALL) NOPASSWD: /ruta/a/tu-script.sh"
  - I've called this scritp as a service:
      ````
      [Unit]
      Description=Ejecutar mi script al inicio
      
      [Service]
      ExecStart=/bin/bash -c 'sudo /ruta/a/tu-script.sh'
      Type=oneshot
      RemainAfterExit=true
      User=tu-usuario
      
      [Install]
      WantedBy=default.target
      ````
      >> sudo systemctl enable mi-script.service
      >> sudo systemctl start mi-script.service //test it first

## Hardware Button GPIO 
- Connect PIN 27 to your button circuit for video switching.
- Press and release this button to switch videos.
- Create a button circuit connecting PIN 27 to the 3V3 power supply
- ![image](https://github.com/carlesgutierrez/videoplayer-nodejs-p5js-gpio/assets/203877/dbfcf1e3-86c6-45ab-b09a-3314628d0b8b)

## Auto Start App
- Add two scripts (.sh files) to Ubuntu's startup applications:
  - Script to load server: [loadServer.sh](https://github.com/carlesgutierrez/videoplayer-nodejs-p5js-gpio/blob/main/loadServer.sh)
  - Script to start firefox at localhost in kiosk mode. [startCabinaAtFirefox.sh](https://github.com/carlesgutierrez/videoplayer-nodejs-p5js-gpio/blob/main/startCabinaAtFirefox.sh)
