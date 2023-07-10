const { exec } = require('youtube-dl-exec');

async function descargarAudio(url) {
  try {
    const options = {
      output: 'audio.mp3', // Nombre del archivo de salida
      extractAudio: true, // Extrae solo el audio
      audioFormat: 'mp3', // Formato de audio
      restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
    };

    const file = await exec(url, options);
    console.log(file);
    console.log("------------------->");
    console.log('¡Audio descargado exitosamente!');
  } catch (error) {
    console.error('Ocurrió un error al descargar el audio:', error);
  }
}

// URL del video de YouTube del que deseas descargar el audio
const videoUrl = 'https://www.youtube.com/watch?v=y8a8oUnY_kA.js';

descargarAudio(videoUrl);
