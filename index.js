import { where } from "sequelize";
import { authenticate, connection } from "./config/database.js";
import { Aluno } from "./models/aluno.js";
import { Aula } from "./models/aula.js";
import { Instrutor } from "./models/instrutor.js";
import express from "express";

authenticate(connection).then(() => {
  connection.sync();
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/alunos", async (req, res) => {
  const listaAlunos = await Aluno.findAll();
  res.json(listaAlunos);
});

app.get("/alunos/:id", async (req, res) => {
  const aluno = await Aluno.findOne({
    where: { id: req.params.id },
    include: [Instrutor],
  });
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ message: "Aluno não encontrado!" });
  }
});

app.post("/alunos", async (req, res) => {
  //Extraimos os dados do body que serão usados na inserção
  const { nome, email, telefone, cpf, dataNasc, instrutor } = req.body;
  try {
    //tentativa de inserir o cliente
    await Aluno.create(
      { nome, email, telefone, cpf, dataNasc, instrutor },
      { include: [Instrutor] }
    );
    res.json({ message: "Aluno criado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao inserir Aluno." });
  }
});

app.put("/alunos/:id", async (req, res) => {
  // Checar se o cliente existe
  const idAluno = req.params.id;
  const { nome, email, telefone, cpf, dataNasc, instrutor } = req.body;
  try {
    const aluno = await Aluno.findOne({ where: { id: idAluno } });

    if (aluno) {
      //seguir com a atualização
      //Atualiza a linha do endereço que for o id do cliente
      //for igual ao id do cliente sendo atualizado
      await Instrutor.update(instrutor, { where: { alunoID: idAluno } });
      await aluno.update({ nome, email, telefone });
      res.json({ message: "Aluno atualizado." });
    } else {
      //404
      res.status(404).json({ message: "O aluno não foi encontrado!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao atualizar o Aluno" });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  const idAluno = req.params.id;
  try{
      const aluno = await Aluno.findOne({ where: { id: idAluno }})
      if(aluno){
        //apagar o cliente
        await aluno.destroy();
        res.json({ message: "Aluno removido com sucesso!" })
      } else{
        res.status(404).json({ message: "Aluno não encontrado!" })
      }
    } catch{
      res.status(500).json({ message: "Ocorreu um erro ao excluir aluno!" })
      
    }
  
})





app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost3000/");
});
