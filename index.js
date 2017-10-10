var express = require("express");

var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

//step 1
io.on("connection",function(socket)
{
    console.log("there is a connection to server: "+ socket.id);
    
    socket.on("disconnect",function(){
        console.log(socket.id + " : disconnection ")
    });

    //step 3 
    //server (listen from ) lang nghe tu client
    socket.on("Client-send-data",function(data)
        {
            console.log(data + socket.id);

            //step 4
            io.sockets.emit("Server-send-back-color", data);

            // server gui tra lai data cho ALL khach hang client
            //io.sockets.emit("Server-send-data", data+ "that is a data from server");

            //server send back data to all clients , exception the sender
        // socket.broadcast.emit("Server-send-data", data+"du lieu");

            //server send back the sender, only sender
            //socket.emit("Server-send-data", data+"du lieu");

            //choose socket to send back data, ex: A to B, or C to B...
            // io.to("socketid").emit();


        });
});

app.get("/",function(req,res)
{
    res.render("trangchu");
});