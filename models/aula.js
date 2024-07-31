import { DataTypes, HasMany } from "sequelize"
import {connection} from "../config/database.js"
import { Aluno } from "./aluno.js"
import {Instrutor} from "./instrutor.js"

export const Aula = connection.define("aula",{
    nomeAula: { 
        type: DataTypes.STRING(130),  
        allowNull: false, 
    },
    horario:{
        type:DataTypes.DATE,
        allowNull: false,
        unique:true
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


//1:1

