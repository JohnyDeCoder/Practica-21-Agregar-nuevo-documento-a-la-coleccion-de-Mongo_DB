const express = require('express'); // inyectamos express
const router = express.Router(); // creamos un router de express

const Person = require('../models/persons'); // inyectamos el modelo de persons

router.get('/gente', async (req, res) => { // creamos una ruta para obtener todas las personas
    const Persons = await Person.find(); // obtenemos todas las personas de la base de datos y las guardamos en una constante llamada Persons (await es para hacer async/await)
    res.render('index', { Persons }); // renderizamos la vista index.ejs
});

router.get('/addPerson', (req, res) => { // creamos una ruta para agregar personas
    res.render('addPerson'); // renderizamos la vista add.ejs
});

router.post('/addPerson', async (req, res) => { // creamos una ruta para agregar personas
    const person = Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }); // con la constante person guardamos los datos que nos llegan del formulario, se toma el modelo Person

    await person.save() // guardamos la persona en la base de datos (await es para hacer async/await)
        .then(() => { // si se guardo correctamente
            res.redirect('/gente'); // redireccionamos a la ruta /gente
        })
        .catch((err) => { // si hubo un error
            console.log(err); // mostramos el error en consola
        })
});

module.exports = router; // exportamos el router para poder usarlo en otros archivos