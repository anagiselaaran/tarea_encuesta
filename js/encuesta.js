const prioAgregar = document.querySelector('#prioridad'); //select
const ulTareas = document.querySelector('.lista_tareas'); //ul
const form = document.querySelector('.box_guardar_opc') //form

const btnGuardar = document.querySelector('#btn_guardar')

form.addEventListener('submit',agregarTareas)

const tareas = []

function agregarTareas(event){
    event.preventDefault()
    const prioridad = event.target.prioridad.value;
    const tarea = event.target.guardar_tarea.value;
    if(tarea === "" || prioridad === ""){
         
        ulTareas.innerHTML = ""
        ulTareas.textContent = "INTRODUCIR TAREAS"
        setTimeout(()=>{
            ulTareas.innerHTML = ""
        },3000)
    }else{

        const mitarea = {
            titulo : tarea,
            prioridad:prioridad
        }

        tareas.push(mitarea)
        pintarTarea(tarea,ulTareas)
    }
    console.log(tareas);
    form.reset();

}
function pintarTarea(tarea,domElement){
    const liTarea = document.createElement('li')
    liTarea.textContent = tarea;
    domElement.appendChild(liTarea)  
}

//separamos por busqueda
const selectBuscar = document.querySelector('#prioridad_buscar');

selectBuscar.addEventListener('change',buscar)
function buscar(event){
    let prioridad = selectBuscar.value
    let filtradas = tareas
    if(prioridad !== ""){
        filtradas = tareas.filter(tarea => tarea.prioridad === prioridad)
        console.log(filtradas);
        pintarLasTareas(filtradas)
    }
}
function pintarLasTareas(filtradas){
    ulTareas.innerHTML = "";
    filtradas.forEach(tarea=>pintarTarea(tarea.titulo,ulTareas))
}
const buscarPorPalabra = document.querySelector('#buscar_tarea');
buscarPorPalabra.addEventListener('change', spelling)
function spelling(event){
    //ulTareas.innerHTML = "";
    const laPalabra = event.target.value.trim();
    const palabraFiltrada = tareas.filter(tarea => tarea.titulo.toLowerCase().includes(laPalabra))

    pintarLasTareas(palabraFiltrada)
    /* let filtradas = palabraFiltrada.forEach(tarea => tarea.titulo.includes(laPalabra))
    console.log(filtradas) */

  

}






/* function filtrar(lista,prioridad){
    return lista.filter(tarea=>tarea.prioridad === prioridad)
}

function pintarTodas(lista,domElement){
    lista.foreach(tarea=>pintarTarea(tarea,domElement))
}
function buscar(event){
    event.preventDefault()
    let prioridad = event.target.value;
    console.log(prioridad);
    const filtrados = filtrar(tareas,prioridad)
    pintarTodas(filtrados,ulTareas)
} */




