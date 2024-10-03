const sql = require('mysql');

const connection = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"db_task"
});

connection.connect((err)=>{
    if(err){
        console.error("Connection failure ", err)
        return;
    }
    console.log('Connected to DB');
})

module.exports=connection;