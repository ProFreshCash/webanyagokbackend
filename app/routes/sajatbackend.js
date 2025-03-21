const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const fileupload = require("express-fileupload");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //saját backend 
  
  app.get('/anyagnevek', (req, res) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'anyagok'
    })
    
    connection.connect()
    
    connection.query('SELECT `anyag_id`,`anyag_neve` from anyag', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()


  
  })

  app.get('/fajtak', (req, res) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'anyagok'
    })
    
    connection.connect()
    
    connection.query('SELECT * from anyag_fajtak', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()


  
  })

  app.get('/anyagok', (req, res) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'anyagok'
    })
    
    connection.connect()
    
    connection.query('SELECT `anyag_id`,`anyag_neve`,anyag_fajtak.anyag_fajtaja,`anyag_leiras`,`anyag_merete`,`anyag_ar`,`anyag_kep` FROM `anyag` INNER JOIN anyag_fajtak ON anyag.anyag_fajtaja = anyag_fajtak.anyag_fajta_id', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()


  
  })

  app.get('/rendelesek', (req, res) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'anyagok'
    })
    
    connection.connect()
    
    connection.query('SELECT `rendeles_id`, `rendelo_neve`, anyag_fajtak.anyag_fajtaja,`rendelt_termek_neve`,`rendeles_mennyisege`, `allapot` FROM `rendeles` INNER JOIN anyag_fajtak ON anyag_fajtak.anyag_fajta_id=rendeles.rendelt_termek_fajtaja ', function (err, rows, fields) {
      if (err) throw err
    
      console.log(rows)
      res.send(rows)
    })
    
    connection.end()

  })

  app.post('/anyagtorles', (req, res) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'anyagok'
    })
    
    connection.connect()
    
    connection.query('DELETE FROM anyag WHERE anyag_id = '+req.body.bevitel1, function (err, rows, fields) {
      if (err) throw err
    
      console.log("Az adat törölve lett!")
      res.send("Az adat törölve lett!")
    })
    
    connection.end()


  
  })

  app.post('/allapot_valtoztat_oke', (req, res) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'anyagok'
    })
    
    connection.connect()
    
    connection.query('UPDATE rendeles SET allapot= 1 WHERE rendeles_id='+req.body.bev1, function (err, rows, fields) {
      if (err) throw err
    
      console.log("A rendelés feldolgozás alatt!")
      res.send("A rendelés feldolgozás alatt!")
    })
    
    connection.end()


  
  })

  app.post('/allapot_valtoztat_nemoke', (req, res) => {

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'anyagok'
    })
    
    connection.connect()
    
    connection.query('UPDATE rendeles SET allapot= 2 WHERE rendeles_id='+req.body.bev1, function (err, rows, fields) {
      if (err) throw err
    
      console.log("A rendelés teljesítve!")
      res.send("A rendelés teljesítve!")
    })
    
    connection.end()


  
  })

  app.post('/uj_anyag_fel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'anyagok'
    })
    connection.connect()

    connection.query('INSERT INTO anyag VAlUES (NULL,"'+req.body.bev1+'","'+req.body.bev2+'","'+req.body.bev3+'","'+req.body.bev4+'","'+req.body.bev5+'","'+req.body.bev6+'")', function (err, rows, fields) {
      if (err) throw err
    
      res.send("Sikeres feltöltés történt");
    })
    
    connection.end()

  })

  app.post('/uj_rendeles_fel', (req, res) => {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'anyagok'
    })
    connection.connect()

    connection.query('INSERT INTO rendeles VAlUES (NULL,"'+req.body.bev1+'","'+req.body.bev2+'","'+req.body.bev3+'","'+req.body.bev4+'", 0)', function (err, rows, fields) {
      if (err) throw err
    
      res.send("Rendelés sikeresen leadva!");
    })
    
    connection.end()

  })

  app.use(fileupload());
  app.post("/upload", (req, res) => {
    const newpath = "./kepek/";
    const file = req.files.file;
    const filename = file.name;
  
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return res.status(500).send({ message: "File upload failed", code: 200 });
      }
        return res.status(200).send({ message: "File Uploaded", code: 200 });
    });
  });

};
