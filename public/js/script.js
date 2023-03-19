const socket = io()
socket.on("connect", ()=>{
    console.log("conectado")
    socket.emit("GET_PRODUCTS")
    
})




socket.on("GIVE_PRODUCTS", (data) =>{
    console.log(data)
})