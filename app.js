const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const newsRoutes = require("./routes/news");

cors = require("cors");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // Middleware para permitir requisições JSON

// Usar as rotas de notícias
app.use(newsRoutes);

const dbUser = "JoseDaniloS"
const dbPassword = "danilojose1277"

// Conectar ao MongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@users.cm01e.mongodb.net/Users?retryWrites=true&w=majority&appName=Users`
  )
  .then(() => {
    console.log("Conectado ao banco de dados!");
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("Erro de conexão:", err);
  });
