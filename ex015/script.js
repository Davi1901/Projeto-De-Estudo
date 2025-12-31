const btn = document.querySelector('#btn')
btn.addEventListener('click', clicar)

function clicar() {
    const data = new Date()
    const ano = data.getFullYear()
    const fano = document.querySelector('#txtano')
    const res = document.querySelector('#res')
    if (fano.value.length == 0 || Number(fano.value) > ano) {
        window.alert('[ERRO] Verifique as informações digitadas e tente novamente!')
    } else {
        let fsex = document.getElementsByName('radsex')
        let idade = ano - Number(fano.value)
        let genero = ''
        let img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if (fsex[0].checked) {
            genero = 'Masculino'
            if (idade >= 0 && idade < 10) {
                //Criança
                img.setAttribute('src', 'homembebe.png')
            } else if (idade < 21) {
                //Jovem
                img.setAttribute('src', 'homemjovem.png')
            } else if (idade < 50) {
                //Adulto
                img.setAttribute('src', 'homemadulto.png')
            } else {
                //Idoso
                img.setAttribute('src', 'homemidoso.png')
            }
        } else if (fsex[1].checked) {
            genero = 'Femino'
             if (idade >= 0 && idade < 10) {
                //Criança
                img.setAttribute('src', 'mulherbebe.png')
            } else if (idade < 21) {
                //Jovem
                img.setAttribute('src', 'jovemM.png')
            } else if (idade < 59) {
                //Adulto
                img.setAttribute('src', 'mulheradulta.png')
            } else {
                //Idoso
                img.setAttribute('src', 'mulheridosa.png')
            }
        }
        res.style.textAlign = 'center'
        res.innerHTML = `Dectamos ${genero} com ${idade} anos`
        res.appendChild(img)

    }
}