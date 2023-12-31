import express  from "express";
import userManager from "../dao/userManager.js";

const router = express.Router();
const UM = new userManager();

//Login
router.get("/login", async(req,res)=>{
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    let {user, pass} = req.query;
    const userLogged = await UM.login(user, pass, req); 

    if (userLogged) {
        res.send({status:"OK", message:userLogged});
    } else {
        console.log('Fallo al loguear en el servidor');
        res.status(401).send({status:"Error", message:"No se pudo loguear el Usuario!"});
    }
    console.log(`res.status: ${res.statusCode}`);
})

//Registro
router.post("/register", async(req, res)=>{
    const userOnBD = await UM.getUserByEmail(req.params.email)
     if(userOnBD){
        console.log("Mail ya esta registrado, usar otro");
        res.status(400).send({status:"error", message: "Email ya existente en base de datos"})
     } else {
    const userRegistered = await UM.addUser(req.body)
    if(userRegistered){
        res.send({status:"OK", message:userRegistered});
    }else {
        res.status(400).send({status:"error", message: "No se pudo registrar al usuario"})
    }
    }
});

//Logout
router.post("/logout", async (req, res) => {
    req.session.destroy(err => {
        if(err) {
          return res.redirect('/profile');
        }
          res.redirect('/login');
      });
});

export default router;