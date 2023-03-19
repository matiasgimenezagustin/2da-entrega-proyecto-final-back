import exphbs from "express-handlebars"
import  express  from "express";
import {routerProducts, routerCarts} from "./router/index.js"
import {Server} from "socket.io"
import path from "path"
import { manager } from "./productManager.js";


const app = express()
const PORT = 8080

app.engine("handlebars", exphbs.engine() )
app.set('views', "./src/views");
app.set("view engine", "handlebars")




/* Handlebars middleware */ 
app.use(express.static('public'));


/* Configs Middlewares */
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* Router Middlewares */
/* app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts ) */

app.get("/", (req, res) =>{
    res.render("formulario", {title:"carga tus productos aqui"})
})

const server = app.listen(PORT, () => console.log(`EXITO: el servidor se esta escuchando en el puerto ${PORT}`))
const io = new Server(server)


io.on("connection", (socket) =>{
    console.log("user connect")

    socket.on("GET_PRODUCTS", async () =>{
        const data = await manager.getProducts()
        socket.emit("GIVE_PRODUCTS", data)
    })
})


