# learnnodejs

## Node.js是什么

Node.js是一个基于Chrome V8 引擎的javascript运行时环境.

Node.js 使用了一个事件驱动,非阻塞式I/O的模型,使其轻量又高效.

Node.js的包管理器npm,是全球最大的开源库生态系统.

## 创建第一个应用

- 引入http模块

  ```javascript
  var http = require('http')
  ```

  

- 创建服务器

  ```javascript
  var http = require('http')
  
  http.createServer(function(request,response){
      response.writeHead(200,{'Content-Type':'text/plain'})
      
      response.end('Hello World\n')
  }).listen(8888)
  ```

  使用node命令执行

  ```shell
  node server.js
  ```

  打开浏览器访问

  http://localhost:8888/

## npm的使用

```shell
npm -v				//查看版本
npm install npm -g	 //自更新
npm install cnpm -g	 //安装国内淘宝镜像(以后cnpm代替npm使用即可)
npm install express

```

## REPL 命令行工具

- R read
- E execute
- P print
- L looper

## 回调函数

Node.js的 异步编程的直接体现就是回调

```javascript
var fs = require('fs')
//同步执行
var data = fs.readFileSync('a.txt')

console.log(data)
```

```javascript
var fs = require('fs')

fs.readFile('a.txt',function(err,data){
    //异步执行
    if(err){
        return
    }
    console.log(data)
})
```

## 事件循环

- Node.js是单进程单线程应用程序,但是因为V8 引擎提供的异步执行回调接口,通过这些接口可以处理大量的并发,所以性能非常高

- Node.js 几乎每个API都是支持回调函数的

- Node.js基本上所有的事件机制都是用设计模式中的观察者模式实现

- Node.js单线程类似进入一个while(true)的事件循环,直到没有事件观察者退出,每个异步事件都生成一个事件观察者,如果有事件发生就调用该回调函数

  

Node.js有多个内置的事件,通过引入events模块,并通过实例化EventEmitter类来绑定和监听事件

```javascript
//引入events模块
var events = require('events')

//创建eventEmitter对象
var eventEmitter = new events.EventEmitter()

//绑定事件及监听
eventEmitter.on('eventName',eventHandler)

//触发事件
eventEmitter.emit('eventName')
```

实例

```javascript
var events = require('events')
var eventEmitter = new events.EventEmitter()
var connectHandler = function connected(){
    console.log('连接成功')
    
    eventEmitter.emit('data_received')
}

eventEmitter.on('connection',connectHandler)

eventEmitter.on('data_received',function(){
    console.log('数据接收成功')
})
eventEmitter.emit('connection')

console.log('执行完毕')
```

## EventEmitter**

## Buffer**

## Stream**

## 模块系统

main.js文件

```javascript
var hello = require('./hello')
hello.world()
```

hello.js文件 

```javascript
exports.world = function(){
    console.log('Hello world')
}
```

exports实际上就是module.exports的相同引用



## 函数

与javascript函数相同

## 路由

router.js

```javascript
function route(pathname){
    console.log('About to route a request for ' + pathname)
}

exports.route = route
```



server.js

```javascript
var http = require('http')
var url = require('url')

function start(route){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname
        console.log('request for ' + pathname + ' received.')
        
        route(pathname)
        
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.write('Hello World')
        response.end()
    }
    
    http.createServer(onRequest).listen(8888)
    console.log('Server has started')
}

exports.start = start;
```

index.js

```javascript
var server = require('./server')
var router = require('./router')

server.start(router.route)
```



