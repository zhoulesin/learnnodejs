# pro-express-module项目

## 基于pro-express项目进行简单封装

## 封装网络请求router

所有的请求处理放在一个router文件中,该文件只处理请求

```javascript
var fs = require('fs')
var express = require('express')
var router = express.Router()

router.get('/students',function(req,rsp){
	fs.readFile('./data.json',function(err,data){
		rsp.render('index.html',JSON.parse(data.toString()))
	})
})

module.exports = router
```

在app中使用router

```javascript
var router = require('./router')
app.use(router)
```

## 封装数据处理student

- 在student文件中处理数据

```javas
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
```

通过传入回调函数来实现模块的分离,router只需要知道获取的结果,不需要知道获取数据的过程

- 在router中使用student模块

```javas
var Student = require('./student')
router.get('/students',function(req,rsp){
    Student.find(function(err,data){
        if(err){
            return rsp.status(500).send('Server error')
        }
        rsp.render('index.html',{students:data})
    })
})
```

