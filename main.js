function getProjects(){
    const urlGitHub = 'https://api.github.com/users/JadersonCunha/repos'
    var loadingElement = document.getElementById('loading')

    fetch(urlGitHub,{
        method: 'GET',
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            showProjects(response)
            loadingElement.style.display = 'none'
        })
        .catch((e) => {
            console.log(`Error -> ${e}`)
        })
}

function showProjects(data){
    var listElement = document.getElementById('minha-lista-de-projetos')
    for(let i = 0; i < data.length; i++)
    {
        let div = document.createElement("div")
        let a = document.createElement("a")
        a.href = data[i]['clone_url']
        a.target = '_blank'
        a.title = data[i]['description']
        let linkText = document.createTextNode(data[i]['name']);
        a.appendChild(linkText);
        div.appendChild(a)
        listElement.appendChild(div)
    }
}

getProjects()

const carrossel = document.getElementById('carrossel');
const slides = Array.from(carrossel.getElementsByTagName('a'));
const legenda = document.getElementById('carrossel-legenda');
let atual = 0;
let intervalo = null;

function mostrarSlide(idx) {
    slides.forEach((slide, i) => {
        slide.style.display = i === idx ? 'block' : 'none';
    });
    // Mostra o nome do arquivo PDF
    const nome = slides[idx].getAttribute('href');
    legenda.textContent = nome;
}

function proximo() {
    atual = (atual + 1) % slides.length;
    mostrarSlide(atual);
}

function anterior() {
    atual = (atual - 1 + slides.length) % slides.length;
    mostrarSlide(atual);
}

document.getElementById('next-btn').onclick = () => {
    proximo();
    reiniciarIntervalo();
};
document.getElementById('prev-btn').onclick = () => {
    anterior();
    reiniciarIntervalo();
};

function reiniciarIntervalo() {
    clearInterval(intervalo);
    intervalo = setInterval(proximo, 4000);
}

// Inicializa
mostrarSlide(atual);
intervalo = setInterval(proximo, 4000);