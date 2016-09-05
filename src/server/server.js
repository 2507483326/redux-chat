import express from "express"
import { Server } from "http"

let app = express()
let http = Server( app )

//configs
let rootPath = require('path').normalize(__dirname + '/../..')
app.set('views', __dirname +'/views')
app.set('view engine','ejs')
app.use(express.static( rootPath +"/public"))

let io = require('socket.io')(http)
import { makeStore } from "./store"
import listenWebSocket from "./io"
const store = makeStore()
listenWebSocket(io,store)

app.get("/",(req,res) => {
	res.render("index")
})

http.listen(9000,() => {
	console.log("listening on port 9000")
})