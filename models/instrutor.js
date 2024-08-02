import { DataTypes } from "sequelize"
import {connection} from "../config/database.js"

export const Instrutor = connection.define("instrutor",{
    nome: { 
        type: DataTypes.STRING(130),  
        allowNull: false, 
    },
    especializacao:{ 
        type: DataTypes.STRING,
        allowNull: false,
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
    cref:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
});