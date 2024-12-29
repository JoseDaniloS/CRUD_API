const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const newsRoutes = require("./routes/news");

cors = require("cors");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://crud-web-theta.vercel.app",
  })
);

app.use(express.json()); // Middleware para permitir requisições JSON

// Usar as rotas de notícias
app.use(newsRoutes);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Conectar ao MongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@users.cm01e.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`
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
