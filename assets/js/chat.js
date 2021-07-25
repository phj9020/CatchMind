import {getSocket} from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMessage = document.getElementById("jsSendMsg");


const appendMesssage = (message, nickname) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="author ${nickname ? "out" : "self"}"> ${nickname ? nickname : "You"} : </span>
        ${message}
    `;
    li.className = "chat__message";
    li.classList.add(nickname ? "other" : "me");
    messages.appendChild(li);
}

const handleSumit = (e)=> {
    e.preventDefault();
    const input = sendMessage.querySelector("input");
    const { value } = input;
    // emit send message event 
    getSocket().emit(window.globalobject.sendMessage, { message: value});
    input.value = "";
    appendMesssage(value, getSocket().nickname);
};

export const handleNewMessage = ({message, nickname}) => {
    return appendMesssage(message, nickname);
};

if(sendMessage) {
    sendMessage.addEventListener("submit", handleSumit);
};

export const disableChat = () => (sendMessage.style.display = "none");
export const enableChat = () => (sendMessage.style.display = "flex");
