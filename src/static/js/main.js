(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var body=document.querySelector("body"),loginForm=document.getElementById("jsLogin"),nickname=localStorage.getItem("nickname"),LOGGED_OUT="loggedOut",LOGGED_IN="loggedIn",login=function(e){window.socket=io("/"),window.socket.emit(window.globalobject.setNickname,{nickname:e})};null===nickname?body.className=LOGGED_OUT:(body.className=LOGGED_IN,login(nickname));var handleFormSubmit=function(e){e.preventDefault();var n=loginForm.querySelector("input"),o=n.value;localStorage.setItem("nickname",o),body.className=LOGGED_IN,n.value="",login(o)};loginForm&&loginForm.addEventListener("submit",handleFormSubmit);

},{}],2:[function(require,module,exports){
"use strict";require("./login"),console.log(window.socket);

},{"./login":1}]},{},[2]);
