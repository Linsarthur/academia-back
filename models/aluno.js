import { DataTypes } from "sequelize"
import {connection} from "../config/database.js"
import { Instrutor } from "./instrutor.js";
import { Aula } from "./aula.js";


export const Aluno = connection.define("aluno",{
    nome: { 
        type: DataTypes.STRING(130),  
        allowNull: false, 
    },
    email:{ 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    cpf:{
        type:DataTypes.STRING(11),
        allowNull:false,
        unique: true
    },
    dataNasc:{
        type:DataTypes.DATEONLY,
        allowNull:false
    }

});

console.log('oi')

Instrutor.hasMany(Aula);
Aula.belongsTo(Instrutor);

//1:N
Aluno.hasMany(Aula);
Aula.belongsTo(Aluno);