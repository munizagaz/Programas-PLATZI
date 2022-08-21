
//importamos la libreria de express.js para poder usarlo en nuestro proyecto
const express = require("express")

//importamos la libreria cors para evitar el error Access-Control-Allow-Origin
const cors = require("cors")

//creamos una aplicacion con express.js
const app = express()

const jugadores = []

app.use(express.static('public'))

//le indicamos a nuestro proyecto que use cors
app.use(cors())

//habilitamos la posibilidad de realizar peticiones POST en formato json
app.use(express.json())


class Jugador{
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon{
    constructor(nombre){
        this.nombre = nombre
    }
}

//hago un get para obtener una respuesta del servidor
// la barra sola "/" significa que tiene que ir a la url raiz.
app.get("/unirse",(req,res)=>{    
    
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    //permito que desde el front se pueda hacer peticiones al backend
    res.setHeader("Access-Control-Allow-Origin","*")

    //le envio de respuesta algo
    res.send(id) 
    
})

//los dos puntos es la manera que tiene express de declarar las variables
//en la url
app.post("/mokepon/:jugadorId",(req,res)=>{

    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)

    //esto es para no responder nada
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req,res)=>{

    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador)=> jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/mokepon/:jugadorId/ataques",(req,res)=>{

    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    //esto es para no responder nada
    res.end()
})

app.get("/mokepon/:jugadorId/ataques", (req,res)=>{

    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador)=> jugador.id === jugadorId)

    res.send({
        ataques: jugador.ataques || []
    })
})

//le indicamos que escuche continuamente desde ese puerto
//las peticiones de los clientes para que siempre pueda responderles
app.listen(8080,() =>{
    console.log("Servidor funcionando.")
})

