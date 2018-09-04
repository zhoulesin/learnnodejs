# pro-express-module-mongodb项目

## 基于pro-express-module项目使用mongodb进行数据持久化

### mongoose使用

- 连接到数据库

  ```javascript
  var mongoose = require('mongoose')
  
  mongoose.connect('mongodb://localhost/test')
  ```

- 生成对象约束(类似建表)

  ```javascript
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
  ```

- 调用方法

  ```javascript
  Student.find(function(err,data){})				//查询所有
  new Student({name:'zs',age:12}).save(function(err)) //添加
  Student.findById(id,function(err,data){})		//根据id查询
  Student.findByIdAndRemove(id,function(err){})	//根据id删除
  Student.findByIdAndUpdate(id,{name:'newname',age:newAge},function(err){}) //根据id更新
  ```

  