const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000)

let rooms = []
let users = []

app.post("/createroom",(req,res)=>{
req.body.id = rooms.length+1
rooms.push(req.body)
res.json({message:"Room Created Successfully"})
})

app.get("/getallrooms",(req,res)=>{
    res.json(rooms)
})

app.put("/bookroom/:userid/:roomid",(req,res)=>{
    var val = Math.floor(1000 + Math.random() * 9000);
    let params = req.params.roomid;
    let userid = req.params.userid;
    let user  = users.findIndex((user)=>user.id==userid);
    let room = rooms.findIndex((room)=>room.id == params);

    let bookeddata = users[user].bookeddata
    req.body.roomid = params
    req.body.roomname = rooms[room].roomname
    req.body.bookingid = val
    users[user].bookeddata = [...bookeddata,req.body]
    
    let allbookings = rooms[room].allbookings
    rooms[room].allbookings = [...allbookings,req.body]
    res.json({"message":"Room booked successfully"})
})

app.get("/bookedrooms",(req,res)=>{
    let bookedrooms = []
    rooms.map((room)=>{
        bookedrooms.push(room.allbookings)
    })
    
    res.json({
        message:"fetched roooms with boooked data",
        allbookingsdata:bookedrooms
})
})

app.post("/createuser",(req,res)=>{
    req.body.id = users.length+1
    users.push(req.body)
    res.json({"message":"User Created","userdetails":req.body})
})

app.get("/getallusers",(req,res)=>{
    res.json(users)
})

app.get("/roombookedcount/:userid/:roomid",(req,res)=>{
let count = 0;
let roomid = req.params.roomid;
let userid = req.params.userid;
let roomcountdata = []
let user  = users.findIndex((user)=>user.id==userid);
let room = rooms.findIndex((room)=>room.id == roomid);
users[user].bookeddata.map((item)=>{
    if(item.roomid == roomid){
        roomcountdata.push(item)
        count++;
    }
})


res.json({"count":count,roomcountdata})
})