const prioAgregar = document.querySelector('#prioridad'); //select
const ulTareas = document.querySelector('.lista_tareas'); //ul
const form = document.querySelector('.box_guardar_opc') //form

const btnGuardar = document.querySelector('#btn_guardar')

form.addEventListener('submit',agregarTareas)

const nuevasTareas = []
let id = 0

function agregarTareas(event){
    event.preventDefault()
    const prioridad = event.target.prioridad.value;
    const tarea = event.target.guardar_tarea.value;
   
    const newTarea = {
        idTarea : id,
        titulo : tarea,
        prioridad: prioridad
    }
    
    if(tarea === "" || prioridad === ""){
        ulTareas.textContent = "INTRODUCIR TAREAS"
        setTimeout(()=>{
            ulTareas.innerHTML = ""
        },3000)
    }else{
        nuevasTareas.push(newTarea)
        id++
        pintarTarea(tarea, ulTareas)
    }
    console.log(nuevasTareas);
    console.log(newTarea.idTarea);
    form.reset();
    }

function clasificar(tarea, prioridad) {
    
}

function pintarTarea(tarea,domElement){
    const liTarea = document.createElement('li')
    liTarea.textContent = tarea;
    liTarea.dataset.id = id;
    const btneliminar = document.createElement('button')
    btneliminar.textContent = 'Eliminar'
    const clase = prioridad.value
   console.log(clase);
   switch (clase) {
    case 'urgente':
        liTarea.style.color = '#89375F'
        break;
       case 'diaria':
           liTarea.style.color = '#BACDDB'
           break;
       case 'mensual':
           liTarea.style.color = '#F3E8FF'
    default:
        break;
   }
    
    btneliminar.addEventListener('click', eliminarTarea)
    liTarea.appendChild(btneliminar)
    domElement.appendChild(liTarea)  
}

function eliminarTarea(event) {
    const li = event.target.parentNode;
    console.log(li);
    const id = li.dataset.id;
    console.log(id);
    let posicion = nuevasTareas.findIndex(tarea => tarea.idTarea === id -1);
    console.log(posicion)
    if (posicion !== -1) {
        // Borramos del array
        nuevasTareas.splice(posicion, 1);
        console.log(nuevasTareas)
        // Borra físicamente el objeto del HTML
        li.remove();
    }
}
//separamos por busqueda
const selectBuscar = document.querySelector('#prioridad_buscar');

selectBuscar.addEventListener('change',buscar)
function buscar(event){
    let prioridad = selectBuscar.value
    let filtradas = nuevasTareas
    if(prioridad !== ""){
        filtradas = nuevasTareas.filter(tarea => tarea.prioridad === prioridad)
        console.log(filtradas);
        pintarLasTareas(filtradas)
    }
}
function pintarLasTareas(lista){
    ulTareas.innerHTML = "";
    lista.forEach(tarea=>pintarTarea(tarea.titulo,ulTareas))
}
const buscarPorPalabra = document.querySelector('#buscar_tarea');
buscarPorPalabra.addEventListener('input', spelling)
function spelling(event){
    //ulTareas.innerHTML = "";
    const laPalabra = event.target.value.trim();
    const palabraFiltrada = nuevasTareas.filter(tarea => tarea.titulo.toLowerCase().includes(laPalabra))

    pintarLasTareas(palabraFiltrada)
    /* let filtradas = palabraFiltrada.forEach(tarea => tarea.titulo.includes(laPalabra))
    console.log(filtradas) */

  

}









