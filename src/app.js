// importar as dependencias
const express = require('express');
const cors = require('cors')
const livrosRotas = require('./routes/psicologosRotas')

// criar a api
const app = express();

// configurar a api
app.use(express.json())
app.use(cors())

// rotas
//         path     rotas
app.use("/psicologos", psicologosRotas)

// exporta ( deixa publica) a nossa api
module.exports = app