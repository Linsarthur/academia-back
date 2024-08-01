import { authenticate, connection } from "./config/database.js";
import express from "express";
import { alunosRouter } from "./Routes/alunos.js"
import { instrutoresRouter } from "./Routes/instrutores.js"
import { aulasRouter } from "./Routes/aulas.js";

authenticate(connection).then(() => {
  connection.sync();
});

const app = express();

app.use(express.json());

app.use(alunosRouter);
app.use(instrutoresRouter);
app.use(aulasRouter);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost3000/");
});

