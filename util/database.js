const Sequelize=require('sequelize');
const sequelize=new Sequelize('blogs','root','root',{
    dialect:'mysql',
    host: 'localhost',
})
module.exports = sequelize;