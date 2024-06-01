const prioAgregar = document.querySelector('#prioridad');
const ulTareas = document.querySelector('.lista_tareas');
const form = document.querySelector('.box_guardar_opc')

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
    liTarea.textContent = tarea.toUpperCase();
    domElement.appendChild(liTarea)  
}


