import { Aula } from "../models/aula.js";
import { Aluno } from "../models/aluno.js";
import { Instrutor } from "../models/instrutor.js";
import { Router } from "express";

export const aulasRouter = Router();


aulasRouter.get("/aulas", async (req, res) => {
  const listaAulas = await Aula.findAll();
  res.json(listaAulas);
});

aulasRouter.get("/aulas/:id", async (req, res) => {
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

aulasRouter.delete("/aulas/:id", async (req, res) => {
  try {
    const aula = await Aula.findByPk(req.params.id);
    if (aula) {
      await aula.destroy();
      res.json({ message: "Aula removida com sucesso" });
    } else {
      res.status(404).json({ message: "Aula não encontrada." });
    }
  } catch (err) {
    res.status(500).json({ message: "Ocorreu um erro ao remover a aula" });
  }
});

aulasRouter.post("/aulas", async (req, res) => {
  const { nomeAula, data, horario, nivel, alunoId, instrutorId } = req.body;

  try {
    const aluno = await Aluno.findByPk(alunoId);
    const instrutor = await Instrutor.findByPk(instrutorId);

    if (aluno && instrutor) {
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

aulasRouter.put("/aulas/:id", async (req, res) => {
  const { nomeAula, data, horario, nivel, alunoId, instrutorId } = req.body;

  try {
    const aula = await Aula.findByPk(req.params.id);
    const aluno = await Aluno.findByPk(alunoId);
    const instrutor = await Instrutor.findByPk(instrutorId);

    if (aluno && instrutor) {
      if (aula) {
        await aula.update({ nomeAula, data, horario, nivel, alunoId, instrutorId });
        res.json({ message: "Aula atualizada com sucesso." });
      } else {
        res.status(404).json({ message: "Aula não encontrada." });
      }
    } else {
      res
        .status(404)
        .json({ message: "Falha ao marcar aula." });
    }
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao atualizar a aula." });
  }
});
