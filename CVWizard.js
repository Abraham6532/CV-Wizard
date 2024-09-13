/* Variables */
const entradaTexto = document.querySelectorAll('input');
const prosa = document.querySelectorAll('textarea');
const habilidadesTecnicas = document.getElementById('formHabilidadesTecnicas');
const habilidadesBlandas = document.getElementById('formHabilidadesBlandas');
const botones = document.querySelectorAll('button');

/* Se agregan los eventos de escucha */
entradaTexto.forEach(input => {
    input.addEventListener('input', handleEvent);
});
prosa.forEach(texto => {
    texto.addEventListener('input', handleEvent);
});

botones.forEach(boton => {
    boton.addEventListener('click', () => agregarExperiencia(boton.id));
});

habilidadesTecnicas.addEventListener('change', handleEvent);
habilidadesBlandas.addEventListener('change', handleEvent);

/* Mandar a llamar la carga de habilidades */
document.addEventListener('DOMContentLoaded', cargarHabilidadesTecnicas);
document.addEventListener('DOMContentLoaded', cargarHabilidadesBlandas);

/* Se implemente el metodo main */
let habilidadesTecnicasTotales = [];
let habilidadesBlandasTotales = [];
function handleEvent(event) {
    let elementoID = event.target.id;
    elementoID = String(elementoID).replace("form", "");

    let cvElemento = document.getElementById(`cv${elementoID}`);
    let formElemento = document.getElementById(`form${elementoID}`);
    let inputName = event.target.name;
    cvElemento.textContent = formElemento.value;
    switch (inputName) {
        case 'link':
            cvElemento.href = formElemento.value;
            break;
        case 'email':
            cvElemento.href = "mailto:" + formElemento.value;
            break;
        case 'telefono':
            /* https://api.whatsapp.com/send/?phone=0000000000&text=Hola */
            cvElemento.href = "https://api.whatsapp.com/send/?phone=" + formElemento.value + "&text=Hola";
            break;
        case 'checkboxTexto':
            if (!formElemento.checked) {
                cvElemento.textContent = "Sin posibilidad de reubicacion"
            }
            break;
        case 'prosa':
            let altura = (formElemento.value.length) / 42 + 1;
            formElemento.style.height = (altura * 16) + 'px';
            cvElemento.innerHTML = cvElemento.textContent.replace(/\n/g, "<br>");
            break;
        case 'tecnicas':
            let habilidadSeleccionada = formElemento.options[formElemento.selectedIndex].value;
            let coincidencias = habilidadesTecnicasTotales.indexOf(habilidadSeleccionada);

            if (coincidencias == -1) {
                habilidadesTecnicasTotales.push(habilidadSeleccionada);
            } else {
                habilidadesTecnicasTotales.splice(coincidencias, 1);
            }
            cvElemento.innerHTML = '<b>Tecnicas:</b>&nbsp;<span>' + habilidadesTecnicasTotales.join(" </span>&nbsp;|&nbsp;<span> ");
            break;
        case 'blandas':
            let habilidadBlandaSeleccionada = formElemento.options[formElemento.selectedIndex].value;
            let coincidenciasBlandas = habilidadesBlandasTotales.indexOf(habilidadBlandaSeleccionada);
            if (coincidenciasBlandas == -1) {
                habilidadesBlandasTotales.push(habilidadBlandaSeleccionada);
            } else {
                habilidadesBlandasTotales.splice(coincidenciasBlandas, 1);
            }
            cvElemento.innerHTML = '<b>Blandas:</b>&nbsp;<span>' + habilidadesBlandasTotales.join(" </span>&nbsp;|&nbsp;<span> ");
            break;
        default:
            break;
    }
}

/* Funcion para cargar las habilidades tecnicas en el select */
async function cargarHabilidadesTecnicas() {
    try {
        const response = await fetch('./JSON/HablidadesTecnicas.json');
        const habilidadesTecnicasLista = await response.json();
        const select = document.getElementById('formHabilidadesTecnicas');

        habilidadesTecnicasLista.forEach(habilidad => {
            const opcion = document.createElement('option');
            opcion.textContent = habilidad.nombre;
            opcion.value = habilidad.nombre;
            select.appendChild(opcion);
        });
    } catch (error) {
        console.error('Error al cargar las habilidades tecnicas:', error);
    }
}
/* Funcion para cargar las habilidades blandas en el select */
async function cargarHabilidadesBlandas() {
    try {
        const response = await fetch('./JSON/HablidadesBlandas.json');
        const habilidadesBlandasLista = await response.json();
        const select = document.getElementById('formHabilidadesBlandas');

        habilidadesBlandasLista.forEach(habilidad => {
            const opcion = document.createElement('option');
            opcion.textContent = habilidad.nombre;
            opcion.value = habilidad.nombre;
            select.appendChild(opcion);
        });
    } catch (error) {
        console.error('Error al cargar las habilidades Blandas:', error);
    }
}

/* Funcion para cargar una nueva experieciencia profesional */
function agregarExperiencia(id) {
    // Obtener el div que deseas copiar
    const divOriginal = document.getElementById(`cv${id}`);

    // Clonar el div con todo su contenido
    const divClonado = divOriginal.cloneNode(true);

    // Eliminar los IDs de los elementos dentro del div clonado
    divClonado.removeAttribute('id'); // Eliminar el ID del div principal
    let ids = divClonado.querySelectorAll('*');

    ids.forEach(idunico => {
        idunico.removeAttribute('id');
      });

    // Obtener el contenedor principal
    const contenedorCV = document.getElementById('cv');

    // Insertar el div clonado antes del div original
    contenedorCV.insertBefore(divClonado, divOriginal);

}
