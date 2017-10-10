var socket =io("http://localhost:3000");

socket.on("server-send-dki-thatbai",function()
{
    alert("The user name have already used");
});

socket.on("server-send-danhsach-Users",function(data)
{
    $("#boxContent").html("");
    data.forEach(function(i) {
        $("#boxContent").append("<div class='user'>"+ i +"</div>");
    });
});

socket.on("server-send-dki-thanhcong", function(data)
    {
           $("#currentUser").html(data);
           $("#loginform").hide(2000);
           $("#chatForm").show(1000);
    }
    );
$(document).ready(function(){
    $("#loginform").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function()
    {
        
        socket.emit("client-send-Username", $("#txtUsername").val());
    });

    $("#btnLogout").click(function()
    {
        
        socket.emit("logout");
        $("#chatForm").hide(2);
        $("#loginform").show(2);
        
    });

    //bat su kien khi 1 user nao do bo con chuot ra khoi box message
    $("#txtMessage").focusout(function(){
        socket.emit("out-typing");
    });

    //bat su kien nhan ve co ai do dang go chu
    socket.on("someone-is-typing",function(data){
        $("#thongbao").html("<img width='15px' src='typing.png'/>"+data);
    });

    //bat su kien nhan ve co ai do ko con dang go chu
    socket.on("nobody-is-typing",function(){
        $("#thongbao").html("");
    });
    

    //bat su kien khi 1 user nao do typing trong box message
    $("#txtMessage").focusin(function(){
        socket.emit("typing");
    });

socket.on("server-send-message",function(data)
{
    $("#listMessages").append("<div class='ms'>" +data.un+ " : " + data.nd +"</div>");
});

$("#btnSendMessage").click(function()
    {       
        socket.emit("user-send-message",$("#txtMessage").val());               
    });

});