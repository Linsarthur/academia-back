import { DataTypes } from "sequelize"
import { connection } from "../config/database.js"

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




