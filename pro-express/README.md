# pro-express项目

## 实现Node最简单交互

## 项目环境

- node 项目运行环境
- express 网络框架
- art-template 模板框架
- express-art-template 模板渲染框架
- body-parser 网络请求参数框架
- bootstrap 响应式布局框架
  - *** 请使用3.3.7版本
- 数据保存在文件中

## 项目功能

| 请求             | 方式 | 参数                       | 说明             |
| ---------------- | ---- | -------------------------- | ---------------- |
| /students        | get  |                            | 获取所有学生列表 |
| /students/add    | get  |                            | 添加学生页面     |
| /students/add    | post | name,age,gender,hobbies    | 操作添加学生     |
| /students/edit   | get  | id                         | 编辑学生页面     |
| /students/edit   | post | id,name,age,gender,hobbies | 操作编辑学生     |
| /students/delete | get  | id                         | 操作删除学生     |

## 技术点-API

- express

  ```javascript
  var express = require('express')
  var app = express()
  app.get('/',function(req,rsp){
    	console.log('收到了url为/的get请求')  
      rsp.send('asdsd')
  })
  app.post('/asd',function(req,rsp){
      console.log('收到了url为/asd的post请求')
  })
  app.listen(3000,function(){
      console.log('express is running at port 3000...')
  })
  ```

- express- art-template

  ```shell
  // 使用art-template模板引擎,自动从views目录中找对应的.html结尾的文件
  app.engine('html',require('express-art-template'))
  app.get('/',function(req,rsp){
    	console.log('收到了url为/的get请求')  
      rsp.render('index.html',{ data:data })
  })
  ```

- body-parser

  ```shell
  //配置body-parser 会解析post请求参数,放到req.body中
  var bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({ extended:false }))
  app.use(bodyParser.json())
  ```

  

## 运行

- 安装项目所需环境

  ```shell
  npm install
  ```

- 在node中运行

  ```shell
  node app.js
  ```

- 在浏览器中访问

  http://localhost:3000/students