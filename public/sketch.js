let bVideo1Active = false;
let video1, video2;
var socket;


function preload(){
    video1 = createVideo(
    ['assets/video1.webm' /*, 'assets/small.ogv', 'assets/small.webm'*/],
    vidLoad1
  );
  video2 = createVideo(
    ['assets/video2.webm' /*, 'assets/small.ogv', 'assets/small.webm'*/],
    vidLoad2
  );
}


// This function is called when the video loads
function vidLoad1() {
  if(bVideo1Active){
    video1.loop();
    //video.hide();
    video1.position(0, 0, 'fixed');
    console.log("loaded and play video1");
  }

}

function playVideo1(){
    
    video2.pause();
    video2.hide();

    video1.show();
    video1.loop();
    video1.position(0, 0, 'fixed');

  console.log("bVideo1Active = "+bVideo1Active);
}


// This function is called when the video loads
function vidLoad2() {
  if(!bVideo1Active){
    video2.loop();
    //video.hide();
    video2.position(0, 0, 'fixed');
    console.log("loaded and play video2");
  }else{
    video2.hide();
  }
}

function playVideo2(){
    
    video1.pause();
    video1.hide();

    video2.show();
    video2.loop();
    video2.position(0, 0, 'fixed');

  console.log("bVideo1Active = "+bVideo1Active);
}

function setup() {
   createCanvas(windowWidth, windowHeight);


   setupSocketIO();
}

function draw() {
  background(220);
  if(bVideo1Active){
    fill(255);
    //image(video1, 0, 0, video.width, video.height);
  }else {

  }
    
  //text("fps["+nf(str(frameRate()),0, 0)+"]", 20, 20);
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
  if(key=="f"){
    //if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let fs = fullscreen();
      fullscreen(!fs);
    //}
  }
}


