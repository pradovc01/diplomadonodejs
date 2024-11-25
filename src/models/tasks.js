import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The name cannot be null"
            },
        }
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})