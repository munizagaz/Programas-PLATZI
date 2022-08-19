
class Mokepon {
    constructor(nombre,foto,vida,fotoAvatar){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoAvatar
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon (){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.alto,
            this.ancho
            )
    }
}

let ataquePC = [];
let vidasJugador = 3;
let vidasPC = 3;
let resultado;
let opcionDeMokepones
let botones
let todosLosBotones = []
let arregloAtaqueJugador = []
let arregloAtaqueEnemigo = []
let totalGanadosJugador
let totalGanadosEnemigo
let totalEmpates

const botonMascotaJugador = document.getElementById("boton-mascota");
const seccionAtaques = document.getElementById("elije-ataque");
const seccionReiniciar = document.getElementById("reinciar");
const btnReiniciar = document.getElementById("boton-reiniciar");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const seccionMascota = document.getElementById("elije-mascota");
const seccionMensaje = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const spanVidasJugador = document.getElementById("jugador-vidas");
const spanVidasPC = document.getElementById("enemigo-vidas");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanFotoMascotaJugador = document.getElementById("ataques-jugador")
const spanFotoMascotaEnemigo = document.getElementById("ataques-enemigo")
const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let lienzo = mapa.getContext("2d")

let radioHipodoge
let radioCapipepo
let radioRatigueya
let radioLangostelvis
let radioTucapalma
let radioPydos

let btnFuego
let btnTierra
let btnAgua

let hipodogue = new Mokepon ('HIPODOGUE','./assets/mokepons_mokepon_hipodoge_attack.png',5,'./assets/hipodoge.png')
let capipepo = new Mokepon ('CAPIPEPO','./assets/mokepons_mokepon_capipepo_attack.png',5,'./assets/capipepo.png')
let ratigueya = new Mokepon ('RATIGUEYA','./assets/mokepons_mokepon_ratigueya_attack.png',5,'./assets/ratigueya.png')
let langostelvis = new Mokepon ('LANGOSTELVIS','./assets/langostelvis.png',5,'./assets/langostelvisCabeza.png')
let tucapalma = new Mokepon ('TUCAPALMA','./assets/tucapalma.png',5,'./assets/tucapalmaCabeza.png')
let pydos = new Mokepon ('PYDOS','./assets/pydos.png',5,'./assets/pydosCabeza.png')

let hipodogueEnemigo = new Mokepon ('HIPODOGUE','./assets/mokepons_mokepon_hipodoge_attack.png',5,'./assets/hipodoge.png')
let capipepoEnemigo = new Mokepon ('CAPIPEPO','./assets/mokepons_mokepon_capipepo_attack.png',5,'./assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon ('RATIGUEYA','./assets/mokepons_mokepon_ratigueya_attack.png',5,'./assets/ratigueya.png')
let langostelvisEnemigo = new Mokepon ('LANGOSTELVIS','./assets/langostelvis.png',5,'./assets/langostelvisCabeza.png')
let tucapalmaEnemigo = new Mokepon ('TUCAPALMA','./assets/tucapalma.png',5,'./assets/tucapalmaCabeza.png')
let pydosEnemigo = new Mokepon ('PYDOS','./assets/pydos.png',5,'./assets/pydosCabeza.png')

let mokepones = []
let mokeponesEnemigos = []
let mascotaJugador
let mascotaEnemigo
let intervalo
let mapaBackgroud = new Image()
let mascotaJugadorObjeto
let alturaQueBuscamos

let anchoDelMapa = window.innerWidth - 20 //el - 20 es para que tenga un poquito de espacio a los lados de la pantalla

const anchoMaximoDelMapa = 800

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

mapaBackgroud.src = "./assets/mokemap.png"

hipodogue.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)
capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua'}
)
ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'}
)
langostelvis.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'}
)
tucapalma.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'}
)
pydos.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)



hipodogueEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)
capipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua'}
)
ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'}
)
langostelvisEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'}
)
tucapalmaEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'}
)
pydosEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)
mokepones.push(hipodogue,capipepo,ratigueya,langostelvis,tucapalma,pydos)
mokeponesEnemigos.push(hipodogueEnemigo,capipepoEnemigo,ratigueyaEnemigo,langostelvisEnemigo,tucapalmaEnemigo,pydosEnemigo)

function iniciarJuego(){

    mokepones.forEach((mokepon) =>{
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} >
            <label class="mascota" for=${mokepon.nombre} >
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre} >
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

    })

    radioHipodoge = document.getElementById("HIPODOGUE");
    radioCapipepo = document.getElementById("CAPIPEPO");
    radioRatigueya = document.getElementById("RATIGUEYA");
    radioLangostelvis = document.getElementById("LANGOSTELVIS");
    radioTucapalma = document.getElementById("TUCAPALMA");
    radioPydos = document.getElementById("PYDOS");

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    seccionAtaques.style.display = "none";
    seccionReiniciar.style.display = "none"
    seccionVerMapa.style.display = "none"
    btnReiniciar.addEventListener("click", reiniciarJuego);

}

function seleccionarMascotaJugador (){

    if (radioHipodoge.checked){
        spanMascotaJugador.innerHTML = radioHipodoge.id;
        mascotaJugador = radioHipodoge.id
    } else if (radioCapipepo.checked){
        spanMascotaJugador.innerHTML = radioCapipepo.id;
        mascotaJugador = radioCapipepo.id
    } else if (radioRatigueya.checked){
        spanMascotaJugador.innerHTML = radioRatigueya.id;
        mascotaJugador = radioRatigueya.id
    } else if (radioLangostelvis.checked){
        spanMascotaJugador.innerHTML = radioLangostelvis.id;
        mascotaJugador = radioLangostelvis.id
    } else if (radioTucapalma.checked){
        spanMascotaJugador.innerHTML = radioTucapalma.id;
        mascotaJugador = radioTucapalma.id
    } else if (radioPydos.checked){
        spanMascotaJugador.innerHTML = radioPydos.id;
        mascotaJugador = radioPydos.id
    } else {
        alert("No seleccionaste ninguna mascota.");
    }

    botonesAtaques(mascotaJugador)

    secuenciaAtaque()

    iniciarMapa()
    pintarCanvas()

    seccionVerMapa.style.display='flex'
    seccionMascota.style.display='none'
}

function aleatorio(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min)

}

function botonesAtaques(mascota){
    let botonDeAtaque

    mokepones.forEach((mokepon) =>{
        if (mokepon.nombre === mascota){
            botones = mokepon.ataques
        }
    })

    botones.forEach((boton)=>{
        botonDeAtaque = `
        <button id=${boton.id} class="boton-ataque BAtaque">${boton.nombre}</button>
    `
    contenedorAtaques.innerHTML += botonDeAtaque
    })

    btnFuego = document.getElementById("boton-fuego");
    btnTierra = document.getElementById("boton-tierra");
    btnAgua = document.getElementById("boton-agua");

    todosLosBotones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque (){

let contadorAtaques = 0

    todosLosBotones.forEach((botonAt)=> {
        botonAt.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                arregloAtaqueJugador.push('FUEGO')
                botonAt.style.background = 'red'
                console.log(arregloAtaqueJugador)
            } else if(e.target.textContent === '💧'){
                arregloAtaqueJugador.push('AGUA')
                botonAt.style.background = 'red'
                console.log(arregloAtaqueJugador)
            }else {
                arregloAtaqueJugador.push('TIERRA')
                botonAt.style.background = 'red'
                console.log(arregloAtaqueJugador)
            }

            contadorAtaques += 1
            botonAt.disabled = true
            
            if(contadorAtaques == 5){
                atacar()
            }
        })
        
    })
    
}
function agregarFotoMascota(){

    let fotoJugador
    let fotoEnemigo

   //agrego foto del jugador
    mokepones.forEach((mokeponj)=>{
        if(mokeponj.nombre === mascotaJugador){
            fotoJugador = `
            <p id="mascota-jugador">${mokeponj.nombre}</p>
            <img id="imagen-jugador" src=${mokeponj.foto} alt=${mokeponj.nombre} >
            `
            spanFotoMascotaJugador.innerHTML = fotoJugador

        }
    })

    //agrego foto del Enemigo
    mokepones.forEach((mokeponE)=>{
        if(mokeponE.nombre === mascotaEnemigo){
            fotoEnemigo = `
            <p id="mascota-enemigo">${mokeponE.nombre}</p>
            <img id="imagen-enemigo" src=${mokeponE.foto} alt=${mokeponE.nombre} >
            `
            spanFotoMascotaEnemigo.innerHTML = fotoEnemigo

        }
    })
}

function seleccionarMascotaPC (enemigo){
    
    //let mascotaPC = aleatorio(0, mokepones.length - 1);

    mascotaEnemigo = enemigo.nombre
    spanMascotaEnemigo.innerHTML = mascotaEnemigo
    arregloAtaqueEnemigo = enemigo.ataques

    agregarFotoMascota()
    ataqueMascotaPC()

}

function ataqueMascotaPC(){

    for (let i = 0; i < arregloAtaqueEnemigo.length; i++) {

        if(arregloAtaqueEnemigo[i].nombre === '🔥'){
            ataquePC.push('FUEGO')
        } else if(arregloAtaqueEnemigo[i].nombre === '💧'){
            ataquePC.push('AGUA')
        } else {
            ataquePC.push('TIERRA')
        }

    }

    //ordena de manera aleatoria el array
    ataquePC.sort(()=>Math.random()-0.5)

    console.log(ataquePC)
  
}

function atacar(){

    let nuevoAtaqueDelJugador
    let nuevoAtaqueDelEnemigo

    totalEmpates = 0
    totalGanadosEnemigo = 0
    totalGanadosJugador = 0

    for (let i = 0; i < arregloAtaqueJugador.length; i++) {
        
        if(arregloAtaqueJugador[i] == ataquePC[i]){
            "EMPATE 😒"
            totalEmpates += 1
        } else if (arregloAtaqueJugador[i] == "FUEGO" && ataquePC[i] == "TIERRA"){
            totalGanadosJugador += 1
        } else if (arregloAtaqueJugador[i] == "AGUA" && ataquePC[i] == "FUEGO"){
            totalGanadosJugador += 1
        }else if (arregloAtaqueJugador[i] == "TIERRA" && ataquePC[i] == "AGUA"){
            totalGanadosJugador += 1
        }else{
            totalGanadosEnemigo += 1
        }

        nuevoAtaqueDelJugador=document.createElement('p')
        nuevoAtaqueDelEnemigo=document.createElement('p')

        nuevoAtaqueDelJugador.innerHTML = arregloAtaqueJugador[i]
        nuevoAtaqueDelEnemigo.innerHTML = ataquePC[i]

        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    }
    

    console.log('GANADOS JUGADOR: ' + totalGanadosJugador)
    console.log('GANADOS ENEMIGO: ' + totalGanadosEnemigo)
    console.log('EMPATES: ' + totalEmpates)

    if(totalGanadosJugador > totalGanadosEnemigo){
        resultado = "Felicitaciones! GANASTE. 🎉🎉🎉 \n\n" + 
        "Ganados: " + totalGanadosJugador + 
        " Perdidos: " + totalGanadosEnemigo + 
        " Empatados: " + totalEmpates
    }else if(totalGanadosJugador === totalGanadosEnemigo){
        resultado = "EMPATE. 😒 \n\n" + 
        "Ganados: " + totalGanadosJugador + 
        " Perdidos: " + totalGanadosEnemigo + 
        " Empatados: " + totalEmpates
    }else{
        resultado = "PERDISTE. 🍆🍆🍆 \n\n" + 
        "Ganados: " + totalGanadosJugador + 
        " Perdidos: " + totalGanadosEnemigo + 
        " Empatados: " + totalEmpates
    }

    mensajeFinal (resultado)
}

function mensajeFinal (resultado){

    seccionMensaje.innerHTML = resultado
    seccionReiniciar.style.display = "block"

}

function reiniciarJuego(){
    location.reload();
}

function pintarCanvas(){

    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            mascotaJugadorObjeto = mokepon
            mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
            mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY

            //limpio el mapa
            lienzo.clearRect(
                0,
                0,
                mapa.width,
                mapa.height,)
            //pinto el fondo del mapa
            lienzo.drawImage(
                mapaBackgroud,
                0,
                0,
                mapa.width,
                mapa.height)
            //pinto el mokepon en el mapa
            mascotaJugadorObjeto.pintarMokepon()
            
        }
        
    })

    //agrego los mokepones enemigos en el mapa
    mokeponesEnemigos.forEach((mokeponEnemigo)=>{
        mokeponEnemigo.pintarMokepon()
    })

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){

        revisarColision(hipodogueEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
        revisarColision(langostelvisEnemigo)
        revisarColision(tucapalmaEnemigo)
        revisarColision(pydosEnemigo)
    }
}

function moverDerecha(){

    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            mokepon.velocidadX = 5
        }
        
    })

}

function moverIzquierda(){

    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            mokepon.velocidadX = -5
        }
        
    })

}

function moverArriba(){

    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            mokepon.velocidadY = -5
        }
        
    })

}

function moverAbajo(){

    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            mokepon.velocidadY = 5
        }
        
    })

}

function detenerMovimiento(){
    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            mokepon.velocidadX = 0
            mokepon.velocidadY = 0
        }
        
    })

}

function sePresionoUnaTecla(event){

    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "w":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "s":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "a":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        case "d":
            moverDerecha()
            break;
    }

}

function iniciarMapa(){

    //mapa.width = 320
    //mapa.height = 240

    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)

}

//funcion para saber si el avatar de mi personaje choca con 
//alguno de los otros personajes enemigos en el mapa.
function revisarColision(enemigo){

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo || 
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()

    //detenemos los intervalos
    clearInterval(intervalo)

    seccionAtaques.style.display = "flex";
    //seccionAtaques.style.display = "none";
    //seccionMascota.style.display = "none";
    seccionVerMapa.style.display = "none"
    
    seleccionarMascotaPC(enemigo)
}

window.addEventListener("load", iniciarJuego);
