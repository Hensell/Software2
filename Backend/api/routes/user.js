const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');

router.get('/', (req, res)=>{

mysqlConnection.query('select * from usuarios', (err, rows, fields)=>{
if(!err){

    res.json(rows);
}else{
console.log(err);

}

})
});

router.post('/singin',(req,res)=>{
const {UserName, Pass} =req.body;
mysqlConnection.query('select UserName, Rol from usuarios where UserName=? and Pass=?',

[UserName,Pass],

(err, rows, fields)=>{

    if(!err){
        if(rows.length >0){
        let data = JSON.stringify(rows[0]);
        const token =jwt.sign(data, 'stil');
        res.json({token});

      

}else{

    res.json('Usuario o clave incorrectos');
}


    }else{
console.log(err);

    }
}

);

});


//ACA VALIDAR EL BACKEND Y HACER LAS PRUEBAS
router.post('/test',verifyToken, (req,res)=>{
console.log(req.data);

res.json('información secreta');

})

function verifyToken(req,res, next){
if(!req.headers.authorization) return res.status(401).json('No autorizado');

const token= req.headers.authorization.substr(7);

if(token!==''){
const content=jwt.verify(token,'stil');
req.data=content;
next();
}else{
res.status(401).json('Token vacio');

}

}

module.exports = router;