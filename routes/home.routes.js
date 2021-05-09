const app = require('express').Router()
const uploadModel = require('../model/upload.model')

app.get('/',async(req,res)=>{
 const data = await uploadModel.find({})
  res.render('home',{data, alert:req.flash('alert')})
})

app.post('/handelForm',async (req, res) => {
  //console.log(req.body);
  //
 if(req.file == undefined){
  req.flash('alert','not good file' )
   res.redirect('/')
 }else{
  req.session.warning ='wwowwo'
    await uploadModel.insertMany({
      title:req.body.title,
      path: req.file.path
    })
 

    console.log(req.session.warning);
    
    res.redirect('/')
 }

});

module.exports = app 