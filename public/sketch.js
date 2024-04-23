let bVideo1Active = false;
let video1, video2;
var socket;
let timeNoPlayingMax = 13000;
let timerStartVideo1;
let timerStartVideo2;
let bRestarVideo1 = true;
let bRestarVideo2 = true;
let timeMaxWaitingHideCursor = 3000;
let timeWaitingHideCursor = 0;


function preload(){
    video1 = createVideo(
    ['assets/video1.webm' /*, 'assets/small.ogv', 'assets/small.webm'*/]
  );
  video2 = createVideo(
    ['assets/video2.webm' /*, 'assets/small.ogv', 'assets/small.webm'*/]
  );
}


function playVideo1(){
    
    video2.pause();
    video2.hide();

    video1.show();
    video1.loop();
    video1.position(0, 0, 'fixed');

    bVideo1Active = true;
    timerStartVideo1 = millis();

    console.log("playVideo1() --> bVideo1Active = "+bVideo1Active);
}


function playVideo2(){
    
    video1.pause();
    video1.hide();

    video2.show();
    video2.loop();
    video2.position(0, 0, 'fixed');

    bVideo1Active = false;
    timerStartVideo2 = millis();

  console.log("playVideo2() --> bVideo1Active = "+bVideo1Active);
}

function setup() {
   createCanvas(windowWidth, windowHeight);

   timeWaitingHideCursor = millis();
   //setFullScreen();

   setupSocketIO();

   removeBars();

   video1.loop();
   video1.volume(0);
   video1.position(0, 0, 'fixed');
   bVideo1Active = true;

   //video2.loop();
   video2.position(0, 0, 'fixed');
   video2.hide();



   console.log("loaded video1 & video2 and play just video 1, so bVideo1Active = "+bVideo1Active);


}

//------------------------------
function removeBars(){
    const elements = document.getElementsByClassName('nav preview-nav');
  while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function draw() {

  //hide cursor after a while -> https://ostechnix.com/launch-web-browsers-in-kiosk-mode-full-screen-from-cli/
  let ellapsedTimeHideCursor = millis() - timeWaitingHideCursor;
  if(ellapsedTimeHideCursor > timeMaxWaitingHideCursor)noCursor();

  //check unactivi vídeo to play loop from start or not
  if(bVideo1Active){ 
    //check restart for video2
    let ellapsedTimeVideo2 = millis() - timerStartVideo2;
    if(ellapsedTimeVideo2 > timeNoPlayingMax)video2.stop();
  }
  else{
    //check restart for video1
    let ellapsedTimeVideo1 = millis() - timerStartVideo1;
    if(ellapsedTimeVideo1 > timeNoPlayingMax)video1.stop();
  }
}

function setupSocketIO(){
   
  // Conecta con el servidor Socket.IO
  socket = io.connect('http://localhost:3000');

  // Escucha por actualizaciones del estado del botón
  socket.on('buttonState', function(data) {
    console.log('Estado del botón:', data);
    if(data === 0) {
      playVideo2();
    } else {
      playVideo1();
    }
    
  });

  var data = {
  };
  socket.emit('emitedSketchStart', data);

}

function mouseReleased(){
  if(bVideo1Active)playVideo2();
  else playVideo1();
}

function mousePressed(){  
  if(bVideo1Active)playVideo1();
  else playVideo2();

}

function keyReleased(){
  if(key=="f" || key=="F"){
    setFullScreen();
  }
  if(key=="c" || key =="C"){
    noCursor();
  }
}

function setFullScreen(){
  let fs = fullscreen();
  fullscreen(!fs);
}


