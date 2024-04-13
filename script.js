const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000);

let rooms = [];
let users = [];

//initial route
app.get("/", (req, res) => {
  res.json({ message: "Api started successfully!!" });
});

//This route creates the new room
app.post("/createroom", (req, res) => {
  req.body.id = rooms.length + 1;
  rooms.push(req.body);
  res.json({ message: "Room Created Successfully" });
});

//This route retrive all the created rooms
app.get("/getallrooms", (req, res) => {
  res.json(rooms);
});

//This route books the new room with the user id and room id
//This route also checks that the room booking date and time already exists.
app.put("/bookroom/:userid/:roomid", (req, res) => {
  var val = Math.floor(1000 + Math.random() * 9000);
  let exists = false;
  let params = req.params.roomid;
  let userid = req.params.userid;
  let user = users.findIndex((user) => user.id == userid);
  let room = rooms.findIndex((room) => room.id == params);

  rooms[room].allbookings.map((item) => {
    if (
      item.date == req.body.date &&
      ((item.starttime.slice(0, -2) <= req.body.starttime.slice(0, -2) &&
        item.endtime.slice(0, -2) >= req.body.starttime.slice(0, -2)) ||
        (item.starttime.slice(0, -2) <= req.body.endtime.slice(0, -2) &&
          item.endtime.slice(0, -2) >= req.body.endtime.slice(0, -2)))
    ) {
      exists = true;
    }
  });

  if (exists) {
    res.json({ Message: "choose different time!" });
  } else {
    let bookeddata = users[user].bookeddata;
    req.body.roomid = params;
    req.body.roomname = rooms[room].roomname;
    req.body.bookingid = val;
    users[user].bookeddata = [...bookeddata, req.body];

    let allbookings = rooms[room].allbookings;
    rooms[room].allbookings = [...allbookings, req.body];
    res.json({ message: "Room booked successfully" });
  }
});

//This route retrives all the booked rooms
app.get("/bookedrooms", (req, res) => {
  let bookedrooms = [];
  rooms.map((room) => {
    bookedrooms.push(room.allbookings);
  });

  res.json({
    message: "fetched roooms with boooked data",
    allbookingsdata: bookedrooms,
  });
});

//This route creates the new user
app.post("/createuser", (req, res) => {
  req.body.id = users.length + 1;
  users.push(req.body);
  res.json({ message: "User Created", userdetails: req.body });
});

//This route gets all the users and their information
app.get("/getallusers", (req, res) => {
  res.json(users);
});

//This route gives the count and informations of the user that how many times the user booked the specific room.
app.get("/roombookedcount/:userid/:roomid", (req, res) => {
  let count = 0;
  let roomid = req.params.roomid;
  let userid = req.params.userid;
  let roomcountdata = [];
  let user = users.findIndex((user) => user.id == userid);
  let room = rooms.findIndex((room) => room.id == roomid);
  users[user].bookeddata.map((item) => {
    if (item.roomid == roomid) {
      roomcountdata.push(item);
      count++;
    }
  });

  res.json({ count: count, roomcountdata });
});
