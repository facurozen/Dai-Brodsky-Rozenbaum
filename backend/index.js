import express from 'express';
import cors from 'cors';
import usuarioServices from './services/usuarioServices.js';
import sql from 'mssql';
import config from './dbconfig.js';

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json())
let pool = await sql.connect(config);

console.log("escuccho");


app.post('/login', async (req, res) => {
    const login = await usuarioServices.loguearse(req.body.Usuario, req.body.Password)
    if (login > 0) res.status(200).send({'message': 'authenticated'})
    else res.status(200).send({'message': 'user not found'})
    console.log(login);
})
app.post('/register', async (req, res) => {
    console.log(req.body);
    const register = await usuarioServices.register(req.body)
    if(register > 0) res.status(200).send({'message' : 'usuario cargado en la base de datos!'});
})

app.listen(port, () => {
    console.log("listening");
})