const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Animal = sequelize.define("animal",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
},{timestamps:true});

module.exports = Animal