var express =  require('express')
var fs = require('fs')
var bodyParser = require('body-parser')

var app = express()

app.engine('html',require('express-art-template'))

app.use('/public',express.static('./public'))
app.use('/node_modules',express.static('./node_modules'))


app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.get('/students',function(req,rsp){
	 
	fs.readFile('./data.json',function(err,data){
		 
		rsp.render('index.html',JSON.parse(data.toString()))
	})
	
})

app.get('/students/add',function(req,rsp){
	 
	rsp.render('add.html')
	
})

app.get('/students/delete',function(req,rsp){
	 
	fs.readFile('./data.json','utf8',function(err,data){

		if (err) { 
			return rsp.status(500).send('Server error')
		}

		var stus  = JSON.parse(data).students

		var stuIdx = stus.findIndex(function(item){
			return item.id === parseInt(req.query.id)
		})

		stus.splice(stuIdx,1)

		fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
			if (err) {
				console.log(err)
				return rsp.status(500).send('Server error')
			}
			rsp.redirect('/students')
		})

	})
	
})

app.get('/students/edit',function(req,rsp){
	 
	fs.readFile('./data.json','utf8',function(err,data){

		if (err) { 
			return rsp.status(500).send('Server error')
		}

		var stus  = JSON.parse(data).students

		var stu = stus.find(function(item){
			return item.id === parseInt(req.query.id)
		})

		console.log(stu)

		rsp.render('edit.html',stu)
	})

})

app.post('/students/edit',function(req,rsp){
	 
	fs.readFile('./data.json','utf8',function(err,data){

		if (err) { 
			return rsp.status(500).send('Server error')
		}

		var student = req.body

		var stus  = JSON.parse(data).students

		var stu = stus.find(function(item){
			return item.id === parseInt(student.id)
		})

		for(var key in student){
			stu[key] = student[key]
		}

		fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
			if (err) {
				console.log(err)
				return rsp.status(500).send('Server error')
			}
			rsp.redirect('/students')
		})

	})

})


app.post('/students/add',function(req,rsp){
	 
	console.log(req.body)

	fs.readFile('./data.json',function(err,data){

		if (err) {
			return rsp.status(500).send('Server error')
		}
		 
		var stus = JSON.parse(data.toString()).students

		var id = stus[stus.length-1].id + 1

		req.body.id = id

		stus.push(req.body)

		fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
			if (err) {
				return rsp.status(500).send('Server error')
			}
			rsp.redirect('/students')
		})

	})
	
})



app.listen(3000,function(){
	console.log('express is running at port 3000...')
})
