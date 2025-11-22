const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("master","sa","Ri8483@tik",{
    host:"localhost",
    dialect:"mssql"
})

module.exports = sequelize