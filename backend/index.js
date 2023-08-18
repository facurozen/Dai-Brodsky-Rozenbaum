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
const users = [
    {
        "id":1,
        "usuario":"Agustin",
        "password":"Brodsky"
    },
    {
        "id":2,
        "usuario":"Facundo",
        "password":"Rozenbaum"
    }
]

app.post('/login', async (req, res) => {
    const login = await usuarioServices.authenticate(req.body.usuario, req.body.password)
    if (login) res.status(200).send({'message': 'authenticated'})
    else res.status(404).send({'message': 'user not found'})
    console.log(login);
})
app.post('/register', async (req, res) => {
    const return_register = await register(req.body, users)
    if (return_register) {
        console.log(req.body)
        const { username, pass } = req.body
        const request = new sql.Request(pool)
        request
        .input('username', sql.NVarChar(50), username)
        .input('pass', sql.NVarChar(50), pass)
        .execute('insertUser');
        res.status(201).send({'message': 'user created'})
        users = await getUsers()
    }
    else res.status(400).send({'message': 'existent user'})
})

app.listen(port, () => {
    console.log("listening");
})