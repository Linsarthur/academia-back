/* import { where } from "sequelize";
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


app.get("/alunos", async (req, res) => {
  const listaAlunos = await Aluno.findAll();
  res.json(listaAlunos);
});

app.get("/alunos/:id", async (req, res) => {
  const aluno = await Aluno.findOne({
    where: { id: req.params.id }
  });
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ message: "Aluno não encontrado!" });
  }
});

app.post("/alunos", async (req, res) => {
  
  const { nome, email, telefone, cpf, dataNasc} = req.body;
  try {
    
    await Aluno.create(
      { nome, email, telefone, cpf, dataNasc }
    );
    res.json({ message: "Aluno criado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao inserir Aluno." });
  }
});

app.put("/alunos/:id", async (req, res) => {
  const idAluno = req.params.id;
  const { nome, email, telefone, cpf, dataNasc} = req.body;
  try {
    const aluno = await Aluno.findOne({ where: { id: idAluno } });

    if (aluno) {
      await aluno.update({ nome, email, telefone, cpf, dataNasc });
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

//////////////////////////////////////////////////////////

app.get("/instrutors", async (req, res) => {
  const listaInstrutores = await Instrutor.findAll();
  res.json(listaInstrutores);
});

app.get("/instrutors/:id", async (req, res) => {
  const instrutor = await Instrutor.findOne({
    where: { id: req.params.id }
  });
  if (instrutor) {
    res.json(instrutor);
  } else {
    res.status(404).json({ message: "Instrutor não encontrado!" });
  }
});

app.post("/instrutors", async (req, res) => {

  const { nome, especializacao, telefone, cpf, cref } = req.body;
  try {
    await Instrutor.create(
      { nome, especializacao, telefone, cpf, cref }
    );
    res.json({ message: "Instrutor criado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao inserir instrutor." });
  }
});

app.put("/instrutors/:id", async (req, res) => {
  const idInstrutor = req.params.id;
  const { nome, especializacao, telefone, cpf, cref } = req.body;
  try {
    const instrutor = await Instrutor.findOne({ where: { id: idInstrutor } });

    if (instrutor) {
      await instrutor.update({ nome, especializacao, telefone, cpf, cref });
      res.json({ message: "Instrutor atualizado." });
    } else {
      //404
      res.status(404).json({ message: "O instrutor não foi encontrado!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao atualizar o instrutor" });
  }
});

app.delete("/instrutors/:id", async (req, res) => {
  const idInstrutor = req.params.id;
  try{
      const instrutor = await Instrutor.findOne({ where: { id: idInstrutor }})
      if(instrutor){
        await instrutor.destroy();
        res.json({ message: "Aluno removido com sucesso!" })
      } else{
        res.status(404).json({ message: "Instrutor não encontrado!" })
      }
    } catch{
      res.status(500).json({ message: "Ocorreu um erro ao excluir instrutor!" })
    }
})

//////////////////////////////////////////////////////////

app.get("/aulas", async (req, res) => {
  const listaAulas = await Aula.findAll();
  res.json(listaAulas);
});

app.get("/aulas/:id", async (req, res) => {
  const aula = await Aula.findOne({
    where: { id: req.params.id },
    include: [{ model: Instrutor, attributes: ["id", ["nome", "nomeInstrutor"]] },
    { model: Aluno, attributes: ["id", ["nome", "nomeAluno"]] }]
  });

  if (aula) {
    res.json(aula);
  } else {
    res.status(404).json({ message: "Aula não encontrada." });
  }
});

app.delete("/aulas/:id", async (req, res) => {
  try {
    const aula = await Aula.findByPk(req.params.id);
    if (aula) {
      await aula.destroy();
      res.json({ message: "Aula removida com sucesso" });
    } else {
      res.status(404).json({ message: "Aula não encontrada." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao excluir a aula" });
  }
});

app.post("/aulas", async (req, res) => {
  const { nomeAula, data, horario, nivel, alunoId, instrutorId } = req.body;

  try {
    const aluno = await Aluno.findByPk(alunoId);
    const instrutor = await Instrutor.findByPk(instrutorId);

    if (aluno, instrutor) {
      await Aula.create({ nomeAula, data, horario, nivel, alunoId, instrutorId });
      res.json({ message: "Aula marcada com sucesso." });
    } else {
      res
        .status(404)
        .json({ message: "Falha ao marcar aula." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao marcar aula." });
  }
});

 app.put("/aulas/:id", async (req, res) => {
   const { nomeAula, data, horario, nivel } = req.body;

   try {
     const aula = await Aula.findByPk(req.params.id);
     if (aula) {
       await aula.update({ nomeAula, data, horario, nivel });
       res.json({message: "Aula atualizado com sucesso."});
     } else {
       res.status(404).json({ message: "Aula não encontrada." });
     }
  } catch (err) {
    res.status(500).json({message: "Um erro ocorreu ao atualizar a aula."});
  }
 });

//////////////////////////////////////////////////////////

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost3000/");
});
*/
