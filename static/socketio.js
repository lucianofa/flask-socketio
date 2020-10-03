
window.onload = function () {
    const socket = io('http://127.0.0.1:5000')
    socket.on('connect', ()=>{
        socket.send('Usuário conectado ao socket!')
    })

    function addToChat(msg) {
        const p = document.createElement("p");
        const chat = document.querySelector(".chat");
        p.innerHTML = `<strong>${msg.nome}</strong>: ${msg.message}`
        chat.append(p)
    }

    document.querySelector("form").addEventListener("submit", function () {
        event.preventDefault();

        socket.emit("sendMessage", {nome: event.target[0].value, message: event.target[1].value});
        event.target[0].value = "";
        event.target[1].value = "";
    })

    socket.on("getMessage", (msg) => {
        addToChat(msg)
    })

    socket.on("messages", (msgs) => {
        for(msg of msgs){
            addToChat(msg);
        }
    })
}