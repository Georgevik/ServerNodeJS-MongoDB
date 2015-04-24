var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {});
});

router.get('/registro', function(req, res) {
    res.render('index', {});
});

/**
 * RUTA PARA AÑADIR UN NUEVO USUARIO
 */
router.get('/addUsuario', function(req, res) {
    //obtenemos la db
    var db = req.db;

    //obtenemos el contenido del form por los name
    var usuario = req.body.usuario;
    var email = req.body.email;
    var password = req.body.password;

    //obtenemos la coleccion donde vamos a insertar
    var collection = db.get('usercollection');

    //Insertamos en la base de datos el nuevo usuario
    collection.insert({
        "usuario" : usuario,
        "email" : email,
        "password" : password

    }, function (err, doc) {
        if (err) {
            //Si hay algun problema
            res.send("Ha habido un problema añadiendo el campo a la base de datos");
        }
        else {
            //Si funciona, indicamos que seguimos estando en /registro y no en /anadirUsuario
            res.location("registro");
            //y redireaccionamos a esa pagina
            res.render("registro");
        }
    });
});

/**
 * RUTA PARA OBTENER LOS USUARIOS DE LA BASE DE DATOS
 */
router.get('/usuarios', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('usuarios', {
            "usuarios" : docs
        });
    });
});



module.exports = router;
