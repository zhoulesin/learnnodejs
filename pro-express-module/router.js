
var express = require('express')
var Student = require('./student')
var router = express.Router()

router.get('/students',function(req,rsp){

	Student.find(function(err,data){
		if (err) {
			return rsp.status(500).send('Server error')
		}
		rsp.render('index.html',{students:data})
	})
	 
	// fs.readFile('./data.json',function(err,data){
		 
	// 	rsp.render('index.html',JSON.parse(data.toString()))
	// })
	
})


router.get('/students/add',function(req,rsp){
	 
	rsp.render('add.html')
	
})

router.get('/students/delete',function(req,rsp){

	Student.deleteOneById(parseInt(req.query.id),function(err){
		if (err) {
			return rsp.status(500).send('Server error')
		}
		rsp.redirect('/students')
	})
	 
	// fs.readFile('./data.json','utf8',function(err,data){

	// 	if (err) { 
	// 		return rsp.status(500).send('Server error')
	// 	}

	// 	var stus  = JSON.parse(data).students

	// 	var stuIdx = stus.findIndex(function(item){
	// 		return item.id === parseInt(req.query.id)
	// 	})

	// 	stus.splice(stuIdx,1)

	// 	fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
	// 		if (err) {
	// 			console.log(err)
	// 			return rsp.status(500).send('Server error')
	// 		}
	// 		rsp.redirect('/students')
	// 	})

	// })
	
})

router.get('/students/edit',function(req,rsp){

	Student.findOneById(req.query.id,function(err,student){
		if (err) { 
			return rsp.status(500).send('Server error')
		}
		rsp.render('edit.html',student)
	})
	 
	// fs.readFile('./data.json','utf8',function(err,data){

	// 	if (err) { 
	// 		return rsp.status(500).send('Server error')
	// 	}

	// 	var stus  = JSON.parse(data).students

	// 	var stu = stus.find(function(item){
	// 		return item.id === parseInt(req.query.id)
	// 	})

	// 	console.log(stu)

	// 	rsp.render('edit.html',stu)
	// })

})

router.post('/students/edit',function(req,rsp){


	Student.update(req.body,function(err){
		if (err) { 
			return rsp.status(500).send('Server error')
		}
		rsp.redirect('/students')
	})
	 
	// fs.readFile('./data.json','utf8',function(err,data){

	// 	if (err) { 
	// 		return rsp.status(500).send('Server error')
	// 	}

	// 	var student = req.body
	// 	student.id = parseInt(student.id)

	// 	var stus  = JSON.parse(data).students

	// 	var stu = stus.find(function(item){
	// 		return item.id === student.id
	// 	})

	// 	for(var key in student){
	// 		stu[key] = student[key]
	// 	}

	// 	fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
	// 		if (err) {
	// 			console.log(err)
	// 			return rsp.status(500).send('Server error')
	// 		}
	// 		rsp.redirect('/students')
	// 	})

	// })

})


router.post('/students/add',function(req,rsp){
	 
	console.log(req.body)

	Student.save(req.body,function(err){
		if (err) {
			return rsp.status(500).send('Server error')
		}
		rsp.redirect('/students')
	})

	// fs.readFile('./data.json',function(err,data){

	// 	if (err) {
	// 		return rsp.status(500).send('Server error')
	// 	}
		 
	// 	var stus = JSON.parse(data.toString()).students

	// 	var id = stus[stus.length-1].id + 1

	// 	req.body.id = id

	// 	stus.push(req.body)

	// 	fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
	// 		if (err) {
	// 			return rsp.status(500).send('Server error')
	// 		}
	// 		rsp.redirect('/students')
	// 	})

	// })
	
})


module.exports = router
