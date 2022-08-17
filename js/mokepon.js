
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

class Mokepon {
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 60
        this.alto = 60
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
    }
}

let hipodogue = new Mokepon ('HIPODOGUE','./assets/mokepons_mokepon_hipodoge_attack.png',5)
let capipepo = new Mokepon ('CAPIPEPO','./assets/mokepons_mokepon_capipepo_attack.png',5)
let ratigueya = new Mokepon ('RATIGUEYA','./assets/mokepons_mokepon_ratigueya_attack.png',5)
let langostelvis = new Mokepon ('LANGOSTELVIS','./assets/langostelvis.png',5)
let tucapalma = new Mokepon ('TUCAPALMA','./assets/tucapalma.png',5)
let pydos = new Mokepon ('PYDOS','./assets/pydos.png',5)

let mokepones = []
let mascotaJugador
let mascotaEnemigo

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

mokepones.push(hipodogue,capipepo,ratigueya,langostelvis,tucapalma,pydos)

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
        mascotaJugador = radioHipodoge.id;
        seleccionarMascotaPC()
    } else if (radioCapipepo.checked){
        spanMascotaJugador.innerHTML = radioCapipepo.id;
        mascotaJugador = radioCapipepo.id;
        seleccionarMascotaPC()
    } else if (radioRatigueya.checked){
        spanMascotaJugador.innerHTML = radioRatigueya.id;
        mascotaJugador = radioRatigueya.id;
        seleccionarMascotaPC()
    } else if (radioLangostelvis.checked){
        spanMascotaJugador.innerHTML = radioLangostelvis.id;
        mascotaJugador = radioLangostelvis.id;
        seleccionarMascotaPC()
    } else if (radioTucapalma.checked){
        spanMascotaJugador.innerHTML = radioTucapalma.id;
        mascotaJugador = radioTucapalma.id;
        seleccionarMascotaPC()
    } else if (radioPydos.checked){
        spanMascotaJugador.innerHTML = radioPydos.id;
        mascotaJugador = radioPydos.id;
        seleccionarMascotaPC()
    } else {
        alert("No seleccionaste ninguna mascota.");
    }

    botonesAtaques(mascotaJugador)

    secuenciaAtaque()
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

    //let objetoImgJugador
    //let objetoImgEnemigo

   //agrego foto del jugador
    mokepones.forEach((mokeponj)=>{
        if(mokeponj.nombre === mascotaJugador){
            fotoJugador = `
            <p id="mascota-jugador">${mokeponj.nombre}</p>
            <img id="imagen-jugador" src=${mokeponj.foto} alt=${mokeponj.nombre} >
            `
            spanFotoMascotaJugador.innerHTML = fotoJugador
            //objetoImgJugador = spanFotoMascotaJugador
            //objetoImgJugador.style.width = '80px'
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
            //objetoImgEnemigo = spanFotoMascotaEnemigo
            //objetoImgEnemigo.style.width = '80px'
        }
    })
}

function seleccionarMascotaPC (){
    
    let mascotaPC = aleatorio(0, mokepones.length - 1);

    mascotaEnemigo = mokepones[mascotaPC].nombre
    spanMascotaEnemigo.innerHTML = mascotaEnemigo
    arregloAtaqueEnemigo = mokepones[mascotaPC].ataques

    //seccionAtaques.style.display = "flex";
    seccionAtaques.style.display = "none";
    seccionMascota.style.display = "none";
    
    seccionVerMapa.style.display = "flex"
    
    pintarPersonaje()

    //agregarFotoMascota()

    //ataqueMascotaPC()
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

function pintarPersonaje(){

    //limpio el mapa
    lienzo.clearRect(0,0,mapa.width,mapa.height,)

    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            lienzo.drawImage(
                mokepon.mapaFoto,
                mokepon.x,
                mokepon.y,
                mokepon.alto,
                mokepon.ancho)
        }
        
    })
    
}

function moverPersonaje(){

    mokepones.forEach((mokepon)=>{
        if(mokepon.nombre === mascotaJugador){
            mokepon.x += 5
        }
        
    })

    pintarPersonaje()

}

window.addEventListener("load", iniciarJuego);
