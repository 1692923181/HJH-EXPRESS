const express = require("express")
const cookieParser = require("cookie-parser")
const app =express()
//中间键调用,下面两行代码，实现了给req身上加了一个body
app.use(express.json())
app.use(express.urlencoded({extend:true}))

//中间键调用，下面这行代码，实现了给req加上一个cookise属性，获取cookie数据
// app.use("/hellonpm ",cookieParser())
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


const myHello =type=>{
    return (req,res,next)=>{
        let abc =new Date()
        let year =abc.getFullYear()
        let month =abc.getMonth()+1
        let date =abc.getDate()
        if(type ===1){
            req.requestTime =`${year}-${month}-${date}`
        }else if(type ===2){
            req.requestTime =`${year}-${month}`
        }else if(type ===3){
            req.requestTime =`${year}`
        }else{
            req.requestTime =abc.getTime()
        }
        next()
    }
}

// app.use(myHello(1))

app.get('/test',myHello(1),(req,res)=>{
    console.log(req.requestTime)
    res.send("test")
})

app.get('/test1',myHello(2),(req,res)=>{
    console.log(req.requestTime)
    res.send("test1")
})

app.listen(3000) 