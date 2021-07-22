const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");
const nickname = localStorage.getItem('nickname');

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const login = (nickname) => {
    const socket = io("/");
    socket.emit("setNickname", {nickname});
}

if (nickname === null) {
    body.className = LOGGED_OUT;
} else {
    body.className = LOGGED_IN;
    // 이미 로그인 경우
    login(nickname);
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    const input = loginForm.querySelector("input");
    const value = input.value;
    localStorage.setItem("nickname", value);
    body.className = LOGGED_IN;
    input.value = "";
    login(value);
}

if(loginForm) {
    loginForm.addEventListener("submit", handleFormSubmit);
}

