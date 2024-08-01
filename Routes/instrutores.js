import { Instrutor } from "../models/instrutor.js";
import { Router } from "express";

export const instrutoresRouter = Router();


instrutoresRouter.get("/instrutors", async (req, res) => {
    const listaInstrutores = await Instrutor.findAll();
    res.json(listaInstrutores);
  });
  
  instrutoresRouter.get("/instrutors/:id", async (req, res) => {
    const instrutor = await Instrutor.findOne({
      where: { id: req.params.id }
    });
    if (instrutor) {
      res.json(instrutor);
    } else {
      res.status(404).json({ message: "Instrutor não encontrado!" });
    }
  });
  
  instrutoresRouter.post("/instrutors", async (req, res) => {
  
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
  
  instrutoresRouter.put("/instrutors/:id", async (req, res) => {
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
  
  instrutoresRouter.delete("/instrutors/:id", async (req, res) => {
    const idInstrutor = req.params.id;
    try{
        const instrutor = await Instrutor.findOne({ where: { id: idInstrutor }})
        if(instrutor){
          await instrutor.destroy();
          res.json({ message: "Instrutor removido com sucesso!" })
        } else{
          res.status(404).json({ message: "Instrutor não encontrado!" })
        }
      } catch{
        res.status(500).json({ message: "Ocorreu um erro ao excluir instrutor!" })
      }
  })