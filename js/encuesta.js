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
        localStorage.setItem('nuevasTareas' ,JSON.stringify(nuevasTareas))
    }
    console.log(nuevasTareas);
    console.log(newTarea.idTarea);
    form.reset();
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
        liTarea.classList.add('urgente')
        break;
       case 'diaria':
           liTarea.classList.add('diaria')
           break;
       case 'mensual':
           liTarea.classList.add('mensual')
            break;
   }
    
    btneliminar.addEventListener('click', eliminarTarea)
    liTarea.appendChild(btneliminar)
    domElement.appendChild(liTarea)  
}

function eliminarTarea(event) {
    const li = event.target.parentNode;
    const id = li.dataset.id;
    let posicion = nuevasTareas.findIndex(tarea => tarea.idTarea === id -1);
    console.log(posicion)
    if (posicion !== -1) {
        nuevasTareas.splice(posicion, 1);
        li.remove();
        localStorage.setItem('nuevasTareas' ,JSON.stringify(nuevasTareas))
    }
}
//separamos por busqueda
const selectBuscar = document.querySelector('#prioridad_buscar');
selectBuscar.addEventListener('change',buscar)

function buscar(event){
    let prioridad = selectBuscar.value
    if(prioridad !== ""){
       let filtradas = nuevasTareas.filter(tarea => tarea.prioridad === prioridad)
        console.log(filtradas);
        pintarLasTareas(filtradas, ulTareas)
        
    } else {
        pintarLasTareas(nuevasTareas,ulTareas)//===========
    }
}
function pintarLasTareas(lista,domElement){
    domElement.innerHTML = "";
    lista.forEach(tarea=>pintarTarea(tarea.titulo,ulTareas))
}
const buscarPorPalabra = document.querySelector('#buscar_tarea');
buscarPorPalabra.addEventListener('input', spelling)

function spelling(event) {
    console.log(event.target.value);
    //ulTareas.innerHTML = "";
    const laPalabra = event.target.value;
    const palabraFiltrada = nuevasTareas.filter(tarea => tarea.titulo.toLowerCase().includes(laPalabra))
    console.log(palabraFiltrada);

    pintarLasTareas(palabraFiltrada,ulTareas)
    
}


//LAS TAREAS VIEJAS SE ME GUARDAN DOS VECES SI APRETO EL BOTON PERO LAS MUESTRA UNA :(
//me las acumula en el local storage solo si primero mustro las viejas y despues acumula las nuevas
const tareasViejasbtn = document.querySelector('#tareasViejas')
tareasViejasbtn.addEventListener('click', init) 

function init() { 
    
     if (localStorage.getItem('nuevasTareas')) {
        //pinto lo que hay en el localstorage
        nuevasTareas.push(...JSON.parse(localStorage.getItem('nuevasTareas')))
    }
    pintarLasTareas(nuevasTareas, ulTareas);
   
}









