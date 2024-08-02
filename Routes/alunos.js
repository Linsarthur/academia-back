import { Aluno } from "../models/aluno.js";
import { Router } from "express";

export const alunosRouter = Router();

alunosRouter.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.json(listaAlunos);
  });
  
  alunosRouter.get("/alunos/:id", async (req, res) => {
    const aluno = await Aluno.findOne({
      where: { id: req.params.id }
    });
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ message: "Aluno não encontrado!" });
    }
  });
  
  alunosRouter.post("/alunos", async (req, res) => {
    
    const { nome, email, telefone, cpf, dataNasc} = req.body;
    try {
      
      await Aluno.create(
        { nome, email, telefone, cpf, dataNasc }
      );
      res.json({ message: "Aluno cadastrado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: "Um erro ocorreu ao cadastrar aluno." });
    }
  });
  
  alunosRouter.put("/alunos/:id", async (req, res) => {
    const idAluno = req.params.id;
    const { nome, email, telefone, cpf, dataNasc} = req.body;
    try {
      const aluno = await Aluno.findOne({ where: { id: idAluno } });
  
      if (aluno) {
        await aluno.update({ nome, email, telefone, cpf, dataNasc });
        res.json({ message: "Aluno atualizado!" });
      } else {
        //404
        res.status(404).json({ message: "O aluno não foi encontrado!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao atualizar o aluno." });
    }
  });
  
  alunosRouter.delete("/alunos/:id", async (req, res) => {
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
        res.status(500).json({ message: "Ocorreu um erro ao remover aluno!" })
      }
  })