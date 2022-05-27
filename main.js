const divCentro = document.querySelector("div.centro")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))
const btIniciar = document.querySelector(".bt-iniciar")
const pnt = document.querySelector("div.pnt-num")
const rcd = document.querySelector("div.rcd-num")


let sequencia = []
let animatingColors = false
let currentColorPosition = 0



btIniciar.addEventListener("click", ev => {
    inicio()
    pnt.innerHTML = "0"
})

divMain.addEventListener("click", ev => {
    if (animatingColors) {
        console.log("espere a animação terminar")
        return
    }
    
    const idxClickedElement = divs.indexOf(ev.target)
    
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        divCentro.classList.add("gameOver")
        divCentro.innerHTML = "FIM DE</br>JOGO!"
        btIniciar.innerHTML = "Iniciar"
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")
    
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        setTimeout(() => turno(), 2000)
    }
})


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    btIniciar.innerHTML = "Memorize..."
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        divCentro.classList.remove("gameOver")
        //** centro: contagem */
        divCentro.innerHTML = cnt--
        if(cnt <= 0) {
            setTimeout(() => {
                divCentro.classList.add("comecou")
                divCentro.innerHTML = "Começou!"
            }, 1000)
            setTimeout(() => {
                divCentro.classList.remove("comecou")
                divCentro.innerHTML = sequencia.length
            }, 2000)
            setTimeout(() => turno(), 3000)
            clearInterval(idx)
        }
    }, 1000)
}

function turno() {
    //** centro: pontuacao */
    divCentro.innerHTML = sequencia.length
    pnt.innerHTML = sequencia.length
    if(rcd.innerHTML < sequencia.length){
        rcd.innerHTML = sequencia.length
    }
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}