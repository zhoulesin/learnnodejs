var express = require('express')

var router = express.Router()

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

var studentSchema = new mongoose.Schema({
  name: {
  	type:String,
  	required:true
  },
  hobbies: {
  	type:String
  },
  age: {
  	type:Number,
  	required:true
  },
  gender: {
  	type:Number,
  	enum:[0,1],
  	default:0
  },
});

var Student = mongoose.model('Student', studentSchema);

router.get('/students',function(req,rsp){
	Student.find(function(err,data){
		if (err) {
			return rsp.status(500).send('Server error')
		}
		rsp.render('index.html',{students:data})
	})
})


router.get('/students/add',function(req,rsp){	 
	rsp.render('add.html')	
})

router.get('/students/delete',function(req,rsp){
	Student.findByIdAndRemove(req.query.id,function(err){
		if (err) {
			console.log(err)
			return rsp.status(500).send('Server error')
		}
		rsp.redirect('/students')
	})	 
})

router.get('/students/edit',function(req,rsp){
	Student.findById(req.query.id,function(err,student){
		console.log(typeof student)
		if (err) { 
			return rsp.status(500).send('Server error')
		}
		rsp.render('edit.html',{student:student})
	})	 
})

router.post('/students/edit',function(req,rsp){
	Student.findByIdAndUpdate(req.body.id,req.body,function(err){
		if (err) { 
			return rsp.status(500).send('Server error')
		}
		rsp.redirect('/students')
	})	 
})


router.post('/students/add',function(req,rsp){	
	new Student(req.body).save(function(err){
		if (err) {
			return rsp.status(500).send('Server error')
		}
		rsp.redirect('/students')
	})
})

module.exports = router
