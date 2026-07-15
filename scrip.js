const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="tarea-item">
                <input type="checkbox" class="completada">
                <div class="texto-tarea">
                    <strong>${item.tarea}</strong><br>
                    <span>${item.descripcion}</span>
                </div>
                   <button class="btnVer" data-index="${index}">Ver</button>
                <button class="btnEditar" data-index="${index}">Editar</button>
                <button class="btnEliminar" data-index="${index}">Eliminar</button>
            </div>
        `;

        listaTareas.appendChild(li);
    });
}

btnAgregar.addEventListener("click", () => {
    const tarea = document.getElementById("tarea").value;
    const descripcion = document.getElementById("descripcion").value;

    if (tarea.trim() === "") {
        alert("Debes escribir una tarea.");
        return;
    }

    tareas.push({
        tarea: tarea,
        descripcion: descripcion
    });

    guardarTareas();
    mostrarTareas();

    document.getElementById("tarea").value = "";
    document.getElementById("descripcion").value = "";
});

listaTareas.addEventListener("click", (e) => {
      if (e.target.classList.contains("btnVer")) {
        const index = e.target.dataset.index;

        alert(
            "Tarea: " + tareas[index].tarea +
            "\n\nDescripción:\n" + tareas[index].descripcion
        );
    }

    if (e.target.classList.contains("btnEliminar")) {
        const index = e.target.dataset.index;

        tareas.splice(index, 1);
        guardarTareas();
        mostrarTareas();
    }

    if (e.target.classList.contains("btnEditar")) {
        const index = e.target.dataset.index;

        const nuevoTitulo = prompt("Editar tarea:", tareas[index].tarea);
        const nuevaDescripcion = prompt("Editar descripción:", tareas[index].descripcion);

        if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
            tareas[index].tarea = nuevoTitulo;
        }

        if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== "") {
            tareas[index].descripcion = nuevaDescripcion;
        }

        guardarTareas();
        mostrarTareas();
    }
});

mostrarTareas();