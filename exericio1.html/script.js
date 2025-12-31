document.addEventListener('DOMContentLoaded', carregar)

function carregar() {
    const msg = document.querySelector('#msg')
    const img = document.querySelector('#imagem')
    const data = new Date()
    const hora = data.getHours()
    msg.innerHTML = `Agora são ${hora} horas`
    if (hora < 12) {
        msg.innerHTML += `<p>Bom dia</p>`
        img.src = 'manha.png'
        document.body.style.background = '#fcd298'
    } else if (hora <= 18) {
        msg.innerHTML += `<p>Boa tarde</p>`
        img.src = 'tarde.png'
        document.body.style.background = '#fd8802'
    } else {
        msg.innerHTML += `<p>Boa noite</p>`
        img.src = 'noite2.png'
        document.body.style.background = '#1d2834'
    }
    }
