const express = require('express')
const app = express()
const port = 3000
const path =require('path')
const mongoose = require('mongoose');
// ==============multer ====================
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + file.originalname  )
  }
})

function fileFilter (req, file, cb) {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpej'  ){
    cb(null, true)
  }else{
  cb(null, false)
  }
}


var upload = multer({ dest: 'uploads/', storage,fileFilter })
app.use(upload.single('file'))

//=============== express session=============
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb://localhost/test22',
  collection: 'mySessions'
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store
 
}))

// ============ conect flash =========
var flash = require('connect-flash');
app.use(flash())




app.use(require('./routes/home.routes'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.static(path.join(__dirname,'public')))




mongoose.connect('mongodb://localhost/test22', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('connect to DB'))
.catch(()=>console.log('can not connect to DB'))

app.listen(port, () => console.log(`Example app listening on port port!`))