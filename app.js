const express = require('express');
const { createServer } = require('http');

const { Chip } = require('node-libgpiod');

const app = express();
const server = createServer(app);

const socketIo = require('socket.io'); // Importa Socket.IO
const io = socketIo(server); // Crea un servidor Socket.IO

//Create window appWin
const { app: appWin, BrowserWindow } = require('electron');
console.log("appWin ->")
console.log(appWin);

const chipName = 'gpiochip4'; //RPI5 hardware
const buttonPin = 27; // El pin del botón
let chip;
let buttonLine;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Asegúrate de usar la ruta correcta
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  socket.on('emitedSketchStart', () => {
    const currentValue = buttonLine.getValue();//Recover line
    io.emit('buttonState', currentValue); //Recover currentValue// Usa io.emit para enviar a todos los clientes
  });

  
});



async function setupGPIO() {
  try {
    chip = new Chip(chipName);
    buttonLine = chip.getLine(buttonPin);
    await buttonLine.requestInputMode({ consumer: 'myButtonApp' });
    console.log(`Pin ${buttonPin} configurado como entrada`);
    monitorButton();
  } catch (error) {
    console.error('Error configurando el pin GPIO como entrada:', error);
  }
}

async function monitorButton() {
  try {
    let lastValue = null;
    setInterval(async () => {
      const currentValue = await buttonLine.getValue();//recover
      if (currentValue !== lastValue) {
        console.log(`Estado del botón cambiado a: ${currentValue}`);
        lastValue = currentValue;

        // Enviar el estado actual a todos los clientes conectados
        io.emit('buttonState', currentValue); // Usa io.emit para enviar a todos los clientes

      }
    }, 100);
  } catch (error) {
    console.error('Error al leer el estado del botón:', error);
  }
}

setupGPIO().catch(console.error);//recover

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


//////////////////////////////////7
//Create window

function createWindow() {
  // Crear una ventana nueva
  let mainWindow = new BrowserWindow({
    width: 1920, // Anchura inicial de la ventana
    height: 1080, // Altura inicial de la ventana
    kiosk: true, // Iniciar en modo kiosco
    fullscreen: true, // Iniciar en modo pantalla completa
    autoHideMenuBar: true, // Ocultar la barra de menú
    webPreferences: {
      nodeIntegration: true // Habilitar Node.js en el contexto del renderizador
    }
  })

  // Cargar la aplicación web desde el servidor local
  mainWindow.loadURL('http://localhost:3000')

  // Otras configuraciones de la ventana (opcional)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Iniciar la aplicación
appWin.on('ready', createWindow);

appWin.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    appWin.quit()
  }
})

appWin.on('activate', () => {
  //if (BrowserWindow.getAllWindows().length === 0) {
    //createWindow()
    console.log("* * * let's create createWindow() * * * * ")
  //}
})


