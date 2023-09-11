<template>
  <br>
  <button id="login_logout" @click="loginLogout()" style="width:auto; margin-top: 100px">Login</button>
  <div id="id01" class="modal">

    <form class="modal-content animate" method="post">
      <div class="container">
        <div class="imgcontainer">
          <span @click="cancel()" class="close" title="Close Modal">&times;</span>
          <img src="../assets/login.png" alt="Avatar" class="avatar">
        </div>
        <label><b>Username</b></label>
        <input id="loginUname" type="text" placeholder="Enter Username" name="uname" required>

        <label><b>Password</b></label>
        <input id="loginPass" type="password" placeholder="Enter Password" name="psw" required>

        <button type="button" @click="loginAdmin">Login</button>
      </div>
    </form>
  </div>
  <div id="id02" class="modal">

    <form class="modal-content animate" method="post">
      <div class="container">
        <div class="imgcontainer">
          <span @click="cancel()" class="close" title="Close Modal">&times;</span>
          <img src="../assets/login.png" alt="Avatar" class="avatar">
        </div>
        <br>
        <h2>Bạn có chắc muốn đăng xuất không?</h2>
        <button type="button" @click="cancel()">Cancel</button>
        <button type="button" @click="logoutAdmin()" style="background-color: red">OK</button>
      </div>
    </form>
  </div>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
import {Account} from "@/account";
export default {
  name: "LoginComponent",
  methods:{
    loginAdmin(){
      Account.login($("#loginUname").val(),$("#loginPass").val(),function (){
        $("#id01").css("display","none");
        $("#login_logout").text("Logout");
        $("#login_logout").css("background-color","red");
      })
    },
    logoutAdmin(){
      Account.logout();
      $("#id02").css("display","none");
      $("#login_logout").text("Login");
      $("#login_logout").css("background-color","#04AA6D");
    },
    loginLogout(){
      if(!Account.isLogged())
        $("#id01").css("display","block");
      else if(Account.isLogged()){
        $("#id02").css("display","flex");
      }
    },
    cancel(){
      $("#id01").css("display","none");
      $("#id02").css("display","none");
    }
  },
  mounted() {
    if(!Account.isLogged()) {
      $("#login_logout").text("Login");
      $("#login_logout").css("background-color", "#04AA6D");
    }
    else if(Account.isLogged()){
      $("#login_logout").text("Logout");
      $("#login_logout").css("background-color","red");
    }
  }
}
</script>

<style scoped>
body {font-family: Arial, Helvetica, sans-serif;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

/* Extra styles for the cancel button */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the image and position the close button */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}
span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 500px; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)}
  to {-webkit-transform: scale(1)}
}

@keyframes animatezoom {
  from {transform: scale(0)}
  to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
/* Modal styles */
.modal .modal-dialog {
  max-width: 400px;
}

.modal .modal-header, .modal .modal-body, .modal .modal-footer {
  padding: 20px 30px;
}

.modal .modal-content {
  border-radius: 3px;
  font-size: 14px;
}

.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}

.modal .modal-title {
  display: inline-block;
}

.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}

.modal textarea.form-control {
  resize: vertical;
}

.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}

.modal form label {
  font-weight: normal;
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
</style>