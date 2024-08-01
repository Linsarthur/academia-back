import { DataTypes, HasMany } from "sequelize"
import {connection} from "../config/database.js"
import { Aluno } from "./aluno.js"
import {Instrutor} from "./instrutor.js"

export const Aula = connection.define("aula",{
    nomeAula: { 
        type: DataTypes.STRING(130),  
        allowNull: false, 
    },
    data:{
        type:DataTypes.DATEONLY,
        allowNull: false,
    },
    horario:{
        type:DataTypes.TIME,
        allowNull: false,
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


//1:1

// separar data e hora

