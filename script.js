//FOR IN RECORRE OBJETOS
console.log('Texto prueba👍')

const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content //FUNDAMENTAL EL CONTENIDO
const fragment = document.createDocumentFragment()

let tareas = {
    /*   16059494959: {
           id: 16059494959,
           texto: 'Tarea #1',
           estado: true
       },
       16059494960: {
           id: 16059494960,
           texto: 'Tarea #2',
           estado: true
       }*/
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    agregarTareas()
})

listaTareas.addEventListener('click', e => {
    btnAccion(e)
})



//BOTON AGREGAR LEE LO INGRESADO Y ENVIADO POR SUBMIT QUE ES EL FORMULARIO
formulario.addEventListener('submit', e => {
    e.preventDefault()
        /* console.log(e.target[0].value) ALTERNATIVA PARA CAPTURAR CONTENIDO*/
    console.log(input.value)
    setTarea(e)
})

const setTarea = e => {
    if (input.value.trim() === '') { //trim elimina espacios en blanco
        console.log('esta vacio')
        return
    }
    console.log('diste click')

    //SE CONSTRUYE EL OBJETO CON LOS DATOS INGRESADOS Y UN NUMERO UNICO
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[tarea.id] = tarea //CREA UN OBJETO POR NUMERO DE ID Y GUARDA TODA LA INFO DE TAREA

    //console.log(tarea)
    formulario.reset()
    input.focus() //AL DARLE CLICK SE VUELVE A SELLECCIONAR EL INGRESO DE DATOS

    agregarTareas()

}

// FUNCION AGREGA TAREAS SE CLONA LO QUE VENGA
const agregarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas)) //SE GUARDA EN EL LOCAL STORAGE EL STRING QUE ES LA COLECCION DE OBJETOS PARSEADAS Y SE LE CREA UNA KEY "tareas"


    if (Object.values(tareas).length === 0) {
        listaTareas.innerHTML = '<div class="alert alert-dark">No hay tareas pendientes 😁</div>'
        return
    }
    listaTareas.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true) //con true clona todo lo que tenga
        clone.querySelector('p').textContent = tarea.texto //se clona el contenido del parrafo del html en nueva tarea y el texto ingresado en el formulario que seria el input

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('.fas').classList.replace('fa-check-circle', 'fa-undo')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone) //fragment almacena las cadenas de elementos y despues son pegados

    })
    listaTareas.appendChild(fragment)

}

//ACCION CUANDO SE PRESIONA UN BOTON PUEDE SER ACEPTAR MODIFICAR ELIMINAR
const btnAccion = e => {
    if (e.target.classList.contains('fa-check-circle')) {
        console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = true
        agregarTareas()
    }

    if (e.target.classList.contains('fa-undo')) {
        console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = false
        agregarTareas()
    }

    if (e.target.classList.contains('fa-minus-circle')) {
        delete tareas[e.target.dataset.id]
        agregarTareas()
    }
    e.stopPropagation()
}