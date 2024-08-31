class entidadesDeSalud {
    constructor(nombre){
        this.nombre = nombre;
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}`);
    }
}

const entidadesDisponibles = [
    new entidadesDeSalud("ColSanitas"),
    new entidadesDeSalud("SaludCop"), 
    new entidadesDeSalud("Pediatrics"),
];



const usuariosRegistrados = []

buttonHtml = document.querySelector(".send")

// Opciones de registro cita medica

function getOptions() {
    var Name = document.getElementById("name");
    var email =  document.getElementById("email");
    var number = document. getElementById("number");
    const success = document.getElementById("success");
    const danger = document.getElementById("danger");

    if(Name.value === "" || email.value === "" || number.value === ""){
        danger.style.display = 'block';
    } 
    
    else{
        usuariosRegistrados.push({
            name: Name.value,
            email: email.value,
            number: number.value
        });

        while(usuariosRegistrados.length > 0){
            
            poblarDropdown();

            break;
        }

        setTimeout(() => {
            Name.value= "";
            email.value = "";
            number.value = "";
        }, 4000);  

        success.style.display = "block";
    }


        setTimeout(() => {
            danger.style.display = 'none';
            success.style.display = 'none';
        }, 4000);  
} 


// boton desplegable - se activa una vez el usuario completa los campos
function poblarDropdown(){
    const dropdown = document.getElementById("entidadesDropdown");

    dropdown.innerHTML = `<option value="">Selecciona una entidad</option>`


    entidadesDisponibles.forEach((entidad, index) =>{
        let option = document.createElement("option");
        option.text = entidad.nombre;
        option.value = index;
        dropdown.add(option);
    });

       // Eliminar la visualización de success y danger al hacer una selección
    dropdown.addEventListener('change', () => {
        if (dropdown.value !== "") {
            console.log("Entidad seleccionada:", entidadesDisponibles[dropdown.value].nombre);
        }
    });
}


function verificarEntidad(){
    const dropdown = document.getElementById("entidadesDropdown");
    const seleccion = dropdown.value;




    if(seleccion !== "") {
        const entidadSeleccionada = entidadesDisponibles[seleccion];
        console.log("El usuario selecciono:", entidadSeleccionada);

        // Ocultamos el mensaje de error
        danger.style.display = 'none';

        setTimeout(() => {
            success.style.display = 'block';
        }, 4000);  
    } 
    
    else {
        console.log("Por favor selecciona una entidad de salud");
    }
}

function mostrarMensajeAgendarCita(){
    const success = document.getElementById("success");
    const dropdown = document.getElementById("entidadesDropdown");
    const Name = document.getElementById("name");
    const email = document.getElementById("email");
    const number = document.getElementById("number");


    // Verificamos si el usuario selecciono una entidad de salud
    if(dropdown.value !== ""){
        danger.style.display = 'none';
        success.style.display = 'block';
        success.innerText = "Tu cita ha sido agendada con éxito";


        // Limpiamos los campos de entrada
        Name.value = "";
        email.value = "";
        number.value = "";


        // Restablecemos el dropdown a su opcion predeterminada
        dropdown.value = "";

        
        setTimeout(() => {
            success.style.display = 'block';
        }, 4000);  

    } else {
        console.log("Por favor selecciona una entidad antes de enviar")
    }

}

// Asignamos el evento click al botón para poblar el dropdown
buttonHtml.addEventListener('click', getOptions);


const dropdown = document.getElementById("entidadesDropdown");
dropdown.addEventListener('click',verificarEntidad);

buttonHtml.addEventListener('click', mostrarMensajeAgendarCita);

