import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json())

console.log("escuccho");
const users = [
    {
        "id":1,
        "user":"Agustin",
        "password":"Brodsky"
    },
    {
        "id":2,
        "user":"Facundo",
        "password":"Rozenbaum"
    }
]

app.post('/login',async(req,res)=>{

    users.forEach(element => {
        console.log(req.body.user)
        if(req.body.user === element.user && req.body.password === element.password) {
            console.log("entre")
            res.status(200).json({message:`Bienvenido ${element.user}`});

        }
        });
        res.status(404).json({message:"usuario no econtrado!!"});
}),
app.listen(port, () => {
    console.log("listening");
})