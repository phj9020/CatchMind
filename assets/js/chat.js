export function handleMessageNotification(data) {
    const {message, nickname} = data;
    console.log(`${nickname} said : ${message}`);
};  
