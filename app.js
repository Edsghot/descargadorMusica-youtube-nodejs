const express = require('express');
const { exec } = require('youtube-dl-exec');

const app = express();
app.use(express.json()); // Agregar middleware para parsear el cuerpo de la solicitud como JSON

// Endpoint para descargar el audio y enviarlo al frontend
app.post('/descargaraudio', async (req, res) => {
  try {
    const { url } = req.body; // Obtener la URL del audio desde los parámetros de la solicitud

    const options = {
      output: 'audio.mp3', // Nombre del archivo de salida
      extractAudio: true, // Extrae solo el audio
      audioFormat: 'mp3', // Formato de audio
      restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
    };

    await exec(url, options); // Descargar el audio

    // Enviar el archivo de audio como respuesta al frontend
    res.download(__dirname + '/audio.mp3', 'audio.mp3', (err) => {
      if (err) {
        console.error('Ocurrió un error al enviar el archivo al frontend:', err);
        res.status(500).send('Ocurrió un error al enviar el archivo al frontend');
      } else {
        console.log('¡Audio descargado y enviado exitosamente al frontend!');
      }
    });
  } catch (error) {
    console.error('Ocurrió un error al descargar el audio:', error);
    res.status(500).send('Ocurrió un error al descargar el audio');
  }
});

// Iniciar el servidor en el puerto 3000 (puedes cambiarlo si lo deseas)
app.listen(3000, () => {
  console.log('Servidor API escuchando en http://localhost:3000');
});
