var express = require("express");

var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var mangUsers=["aaa"];

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
io.on("connection",function(socket)
{
    console.log("We have a new connection with Id: "+ socket.id);

    socket.on("client-send-Username", function(data)
    {
        //so sanh mang user co trong danh sach user or ko 
       if(mangUsers.indexOf(data) >= 0)
       {
            socket.emit("server-send-dki-thatbai");
       }
       else
       {
            mangUsers.push(data);
            socket.Username =data;
            socket.emit("server-send-dki-thanhcong",data);
            io.sockets.emit("server-send-danhsach-Users",mangUsers);
       }

       socket.on("logout",function()
        {
            //tim vi tri of thang marked by User  and delete it
            mangUsers.splice(
                mangUsers.indexOf(socket.Username),1
            );

            //emit to others to know there is one user loged out
            socket.broadcast.emit("server-send-danhsach-Users",mangUsers);
        });

        socket.on("user-send-message",function(data)
    {
        io.sockets.emit("server-send-message",{un:socket.Username,nd:data});//JSON
    });

    socket.on("typing",function(data){
        var s = socket.Username+" is typing";
        io.sockets.emit("someone-is-typing",s);
    });

    socket.on("out-typing",function(){
        io.sockets.emit("nobody-is-typing");
    });

    });
});

app.get("/",function(req,res)
{
    res.render("HomePage");
});