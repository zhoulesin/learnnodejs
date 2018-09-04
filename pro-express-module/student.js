var fs = require('fs')

/**
 * 获取所有的学生列表
 * @param  {Function} callback(err,students) 回调函数
 * @return 
 */
exports.find = function(callback){
	fs.readFile('./data.json','utf8',function(err,data){
		if (err) {
			return callback(err)
		} 
		callback(null,JSON.parse(data).students)
	})
}

/**
 * 根据id获取学生
 * @param  {[Number]}   id     学生id
 * @param  {Function} callback(err,student) 回调函数
 * @return 
 */
exports.findOneById = function(id,callback){
	fs.readFile('./data.json','utf8',function(err,data){
		if (err) {
			return callback(err)
		}
		var stus = JSON.parse(data).students

		var stu = stus.find(function(item){
			return item.id === parseInt(id)
		})

		callback(null,stu)

	})
}

/**
 * 添加学生
 * @param  {[Object]}   student  学生Obj
 * @param  {Function} callback(err) 回调函数
 * @return 
 */
exports.save = function(student,callback){
	fs.readFile('./data.json','utf8',function(err,data){
		if (err) {
			return callback(err)
		}

		var stus = JSON.parse(data).students

		var newId = stus[stus.length-1].id + 1

		student.id = newId

		stus.push(student)

		fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

exports.deleteOneById = function(id,callback){
	fs.readFile('./data.json','utf8',function(err,data){
		if (err) {
			return callback(err)
		}

		var stus = JSON.parse(data).students

		var stuIdx = stus.findIndex(function(item){
			return item.id === parseInt(id)
		})

		stus.splice(stuIdx,1)

		fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

exports.update = function(student,callback){
	fs.readFile('./data.json','utf8',function(err,data){
		if (err) {
			return callback(err)
		}

		student.id = parseInt(student.id)

		var stus = JSON.parse(data).students

		var stu = stus.find(function(item){
			return item.id === student.id
		})

		for(var key in student){
			stu[key] = student[key]
		}

		fs.writeFile('./data.json',JSON.stringify({students:stus}),function(err){
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}