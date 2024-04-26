# p5js VideoPlayer switcher for RPI5
## Steps:

### Install Ubuntu 23.10 using PiImager from your computer to your SD (check about [video performance on Firefox](https://www.youtube.com/watch?v=6tFyuzJzDrc))
After a succesfull installation let's do some configure:
- Run `sudo apt update`
- Deactivate the screensaver
- Enable user auto-login
- Create a 'Develop' folder in Home directory
- Open the terminal
- Change directory to Develop with `cd Develop`
- Clone this repository using `git clone thisRepo`
- Install Ubuntu updates and deactivate all [automatic updates and notifications if required](https://askubuntu.com/questions/1322292/how-do-i-turn-off-automatic-updates-completely-and-for-real)

## Install some Software for local ssh accessa

- Install Node.js with `sudo apt install nodejs`
- Install OpenSSH Server with `sudo apt install openssh-server`
- Start the SSH service with `sudo systemctl start ssh`
- Check SSH service status with `sudo systemctl status ssh`
- Display network information with `ip addr show`
Now you can now connect via SSH, PuTTY, WinSCP, etc., using this local IP from another computer on the same local network.
- Use WinSCP to transfer two videos (`movie1.webm` and `movie2.webm`) into the `public/assets/` folder

### External remote controler: 
The only one working option was to use teamviwer. There is an **arm64 version** working with this Ubuntu 23.10 (with **Wayland** ). 
Will allow u file transfer ( no issues ) and full remote control ( but will ask to user to admit the connection all times  )

## Install Node.js Project Requirements

### Manually Install Libraries for GPIO with Node.js
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

## Auto Start App
- Add two scripts (.sh files) to Ubuntu's startup applications:
  - Script to load server: [loadServer.sh](https://github.com/carlesgutierrez/videoplayer-nodejs-p5js-gpio/blob/main/loadServer.sh)
  - Script to start firefox at localhost in kiosk mode. [startCabinaAtFirefox.sh](https://github.com/carlesgutierrez/videoplayer-nodejs-p5js-gpio/blob/main/startCabinaAtFirefox.sh)
 
## Mouse Jiggle --> Issues with autostart and wayladn -> Solution: use MouseJiggler
  - Wayland It's quite painfull about start and hide mouse automatically. Didn't work to use hiding like [unclutter](https://www.baeldung.com/linux/mouse-cursor-hide) ( may be as a service with sudo permisiions might work, I didn't try it.
  - So a working solution was to hide mouse by hacking ubuntu with mouse jiggler in order to simulate the is some user interaction
  - So, I've added visudo permisions to my user to be able to cal mouse jiggle script with sudo permisions and no pass: "cabina2 ALL=(ALL) NOPASSWD: /ruta/a/tu-script.sh"
  - And finally called this scritp as a service:
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
    - sudo systemctl enable mi-script.service
    - sudo systemctl start mi-script.service //test it first

## Hardware Button GPIO 
- Connect PIN 27 to your button circuit for video switching.
- Press and release this button to switch videos.
- Create a button circuit connecting PIN 27 to the 3V3 power supply
- ![image](https://github.com/carlesgutierrez/videoplayer-nodejs-p5js-gpio/assets/203877/dbfcf1e3-86c6-45ab-b09a-3314628d0b8b)
