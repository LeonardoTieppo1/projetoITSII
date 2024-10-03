const e = require("express");
const cors = require('cors');
const app = new e();
const userRoutes=require('./routes/userRoutes.js');
const taskRoutes=require('./routes/taskRoutes.js');
const authRoutes=require('./routes/authRoutes.js');
app.use(cors());
app.use(e.json());

app.use(userRoutes);
app.use(taskRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando!');
})
