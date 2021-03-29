import express from "express"
import mongoose from "mongoose"
import Messages from "./dbMessages.js"
import Pusher from "pusher"
import cors from "cors"

const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1103157",
    key: "81548ec2bc6346f1b1d2",
    secret: "585c1487ee0519feb8bd",
    cluster: "eu",
    useTLS: true
  });

app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    next()
})

const connection_url = "mongodb+srv://admin-shyam:test123@cluster0.h4xfx.mongodb.net/whatsappDB?retryWrites=true&w=majority"

mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection

db.once('open',()=>{
    console.log("DB is Connected")

    const msgCollector = db.collection("messagecontents")
    const changeStream = msgCollector.watch()

    changeStream.on('change',(change)=>{
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument
            pusher.trigger('messages','inserted',
            {
                name : messageDetails.name,
                message : messageDetails.message,
                time : messageDetails.time,
                received : messageDetails.received
            })
        }else{
            console.log("error triggoring Pusher");
        }
    })
})

app.get("/",(req,res)=> res.status(200).send("Helo"))

app.get("/messages/sync",(req,res)=>{

    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new",(req,res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage , (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.listen(port,(req,res)=> console.log("Listening on Local Host :" + port))