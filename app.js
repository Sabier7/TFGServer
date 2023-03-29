const MongoClient = require('mongodb').MongoClient;

// URL de la base de datos
const url = 'mongodb://localhost:27017/nombre_base_de_datos';

// Conexión a la base de datos
MongoClient.connect(url, function(err, client) {
  if (err) throw err;

  // Obtiene la base de datos
  const db = client.db('nombre_base_de_datos');

  // Inicia el servidor
  app.listen(3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
  });
});
