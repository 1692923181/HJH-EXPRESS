const express = require("express")
const cookieParser = require("cookie-parser")
const app =express()
//中间键调用,下面两行代码，实现了给req身上加了一个body
app.use(express.json())
app.use(express.urlencoded({extend:true}))

//中间键调用，下面这行代码，实现了给req加上一个cookise属性，获取cookie数据
app.use(cookieParser())

//中间件使用，静态资源托管设置
app.use(express.static("public"))

//  TODO路由
app.get("/",(req,res)=>{
    // res.write("hellow express")
    // res.end()
    console.log(req.query)
    res.send("hello express")
})
// app.post("/handleLogin",(req,res)=>{
//     //req.body默认是不存在的
//      console.log(req.body)
//      res.send("hellow req.body")
// })
//coolie相关
app.get('/setCookie',(req,res)=>{
    //设置Cookies
    res.cookie('username','zhangsan',{
        maxAge:1000*60*10
    })
    res.send("Cookie设置成功")
})
app.get("/getCookie",(req,res)=>{
    console.log(req.cookies)
    res.send("Cookie获取成功")
})
//req.params
//获取路由的动态参数
//Localhost：3000/hello/apple
//Localhost：3000/hello/bananas
//Localhost：3000/hello/orange
app.get('/hello/:id',(req,res)=>{
    console.log(req.params)
    res.send("我来了吗")
})
app.get('/world/:name/:age',(req,res)=>{
    console.log(req.params)
    console.log(req.get("Accept"))
    res.send("hello world")
})
app.listen(3000)