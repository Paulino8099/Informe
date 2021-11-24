
let btnGuardar = document.querySelector(".btn-guardar");
let btnVerMas = document.querySelector(".btn-verMas");
let btnHistorial = document.querySelector(".btn-historial");

// VARIABLES PARA TODOS LOS INPUT
var inputHoras = document.getElementById("input-horas");
let inputRevisitas = document.querySelector(".input-revisitas");
let inputComentarios = document.querySelector(".input-comentarios");
let inputPublicaciones = document.querySelector(".input-publicaciones");
let inputCursosBiblicos = document.querySelector(".input-cursosBiblicos");
let inputPresentacionVideos = document.querySelector(".input-presentacionVideo");
let inputAño = document.querySelector(".input-año");

// TODOS LOS VALORES DE LOS INPUT
let inputAñoValue = inputAño.value;

// VARIABLES PARA LA VENTANA EMERGENTE POPUP
let ventanaPopup = document.querySelector(".contenedor-popup");
let textAlertPopup = document.querySelector(".text-alert-popup");

//VENTANA EMERGENTE POPUP 

let btnVentanaPopup = document.querySelector(".btn-alert-popup");
btnVentanaPopup.addEventListener('click', () => {
    ventanaPopup.classList.remove("active");
});

// Esta función es para guardar el valor del mes en INPUT MES al hacer click en cualquiera de los meses que se encuentran en la lista 


let inputMes = document.querySelector(".input-mes");

let listaMes = document.querySelector(".lista-mes");
seleccionMes()
function seleccionMes() {
    // Con esta algoritmo podemos extraer los elementos hijos de la lista de los meses ya que al ser una lista esta genera un arreglo que podemos extraer facilmente.
    let hijos = listaMes.children;
    for (let i = 0; i < hijos.length; i++) {
        // Agregar eventos escucha a todos los hijos de la listas de meses
        hijos[i].addEventListener('click', () => {
            // Con este algoritmo podemos extraer el VALOR del elemento donde se escuche el click
            let extraerValorList = hijos[i].childNodes[0].nodeValue;
            inputMes.value = extraerValorList;
            // Ejecutar la funcion para extraer valores del local Storage.
            extraerDatosLocalStorage()
        })
    }
}

// Aqui lo que se hace es que despues que se haga click en cualquiera de los meses que se encuentra en la lista, el valor del input va acambiar a un numero correspondiente a su numero de mes esto sin alterar el valor del input ya seleccionado y ya cargado al propio input que en este caso el valor del input serí el nombre del mes.
function convertirMes() {
    let inputMesValue = inputMes.value;
    if (inputMesValue == 'Enero') inputMesValue = 1;
    if (inputMesValue == 'Febrero') inputMesValue = 2;
    if (inputMesValue == 'Marzo') inputMesValue = 3;
    if (inputMesValue == 'Abril') inputMesValue = 4;
    if (inputMesValue == 'Mayo') inputMesValue = 5;
    if (inputMesValue == 'Junio') inputMesValue = 6;
    if (inputMesValue == 'Julio') inputMesValue = 7;
    if (inputMesValue == 'Agosto') inputMesValue = 8;
    if (inputMesValue == 'Septiembre') inputMesValue = 9;
    if (inputMesValue == 'Octubre') inputMesValue = 10;
    if (inputMesValue == 'Noviembre') inputMesValue = 11;
    if (inputMesValue == 'Diciembre') inputMesValue = 12;
};

// Desplegar lista de los meses al hacer click en el indicador tipo flecha abajo
document.querySelector(".content-btn-listaMes").addEventListener('click', () => {
    document.querySelector(".lista-mes").classList.toggle('active');
    document.querySelector(".svg-listaMes").classList.toggle('rotate');
})

function evaluarCampoAño() {
    if (inputAño.value === '') {
        textAlertPopup.innerHTML = `¡El campo "año" está vacío! ${'<br>'} Debe de introducir un año.`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    } else if (inputAño.value != '' && !(inputAño.value >= 2021 && inputAño.value <= 2025)) {
        textAlertPopup.innerHTML = `¡Debe de proporcionar un año correspodiente a: 2021-2025!`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    } else if (inputMes.value === '') {
        textAlertPopup.innerHTML = `¡Por favor, seleccione un mes!`;
        // Ventana Popup
        ventanaPopup.classList.add("active");
    }
}

btnGuardar.addEventListener("click", function () {
    extraerDatosLocalStorage();
    guardarDatosLocalStorage();
    inputHoras.value = '';
    inputRevisitas.value = '';
    inputComentarios.value = '';
    inputPublicaciones.value = '';
    inputCursosBiblicos.value = '';
    inputPresentacionVideos.value = '';
    evaluarCampoAño();
});

function guardarDatosLocalStorage() {

    if (inputMes.value != '' && (inputAño.value >= 2021 && inputAño.value <= 2023)) {
        /* Aqui lo que trato de hacer es que solo se van a guardar las horas en caso de que el 
          input de horas se encuntra con datos de lo contrario, no se va a enviar nada al localStorage*/
        if (inputHoras.value != '') { guardarHoras() }
        function guardarHoras() {

            let inputMesValue = inputMes.value;
            if (inputMesValue == 'Enero') inputMesValue = 1;
            if (inputMesValue == 'Febrero') inputMesValue = 2;
            if (inputMesValue == 'Marzo') inputMesValue = 3;
            if (inputMesValue == 'Abril') inputMesValue = 4;
            if (inputMesValue == 'Mayo') inputMesValue = 5;
            if (inputMesValue == 'Junio') inputMesValue = 6;
            if (inputMesValue == 'Julio') inputMesValue = 7;
            if (inputMesValue == 'Agosto') inputMesValue = 8;
            if (inputMesValue == 'Septiembre') inputMesValue = 9;
            if (inputMesValue == 'Octubre') inputMesValue = 10;
            if (inputMesValue == 'Noviembre') inputMesValue = 11;
            if (inputMesValue == 'Diciembre') inputMesValue = 12;

            let inputHorasValue = inputHoras.value;
            let mesAñoHoras = `Horas (${inputMesValue}/${inputAño.value})`;
            // SI LOCAL STORAGE NO CONTIENE NINGUN DATO SE LE ENVIA UNO NUEVO
            if (localStorage.getItem(mesAñoHoras) === null) {
                let array = [inputHorasValue, inputMesValue];
                localStorage.setItem(mesAñoHoras, array);
            } else {
                let datosLocalStorage = localStorage.getItem(mesAñoHoras);
                datosLocalStorage = parseInt(inputHorasValue) + parseInt(datosLocalStorage);
                let array = [datosLocalStorage, inputMesValue];
                localStorage.setItem(mesAñoHoras, array);
            }
        }

        /* Aqui lo que trato de hacer es que solo se van a guardar las horas en caso de que el
          input de horas se encuntra con datos de lo contrario, no se va a enviar nada al localStorage*/
        if (inputRevisitas.value != '') { guardarRevisitas() };
        function guardarRevisitas() {

            let inputMesValue = inputMes.value;
            if (inputMesValue == 'Enero') inputMesValue = 1;
            if (inputMesValue == 'Febrero') inputMesValue = 2;
            if (inputMesValue == 'Marzo') inputMesValue = 3;
            if (inputMesValue == 'Abril') inputMesValue = 4;
            if (inputMesValue == 'Mayo') inputMesValue = 5;
            if (inputMesValue == 'Junio') inputMesValue = 6;
            if (inputMesValue == 'Julio') inputMesValue = 7;
            if (inputMesValue == 'Agosto') inputMesValue = 8;
            if (inputMesValue == 'Septiembre') inputMesValue = 9;
            if (inputMesValue == 'Octubre') inputMesValue = 10;
            if (inputMesValue == 'Noviembre') inputMesValue = 11;
            if (inputMesValue == 'Diciembre') inputMesValue = 12;

            // Valor del input 'revisitas'
            let inputRevisitasValue = inputRevisitas.value;
            let mesAñoRevisitas = `Revisitas (${inputMesValue}/${2021})`;
            if (localStorage.getItem(mesAñoRevisitas) === null) {
                let array = [inputRevisitasValue, inputMesValue];
                localStorage.setItem(mesAñoRevisitas, array)
            } else {
                let datosLocalStorage = localStorage.getItem(mesAñoRevisitas);
                datosLocalStorage = parseInt(inputRevisitasValue) + parseInt(datosLocalStorage);
                let array = [datosLocalStorage, inputMesValue];
                localStorage.setItem(mesAñoRevisitas, array);
            }
        };

        if (inputComentarios.value != '') { guardarComentarios() };
        function guardarComentarios() {

            let inputMesValue = inputMes.value;
            if (inputMesValue == 'Enero') inputMesValue = 1;
            if (inputMesValue == 'Febrero') inputMesValue = 2;
            if (inputMesValue == 'Marzo') inputMesValue = 3;
            if (inputMesValue == 'Abril') inputMesValue = 4;
            if (inputMesValue == 'Mayo') inputMesValue = 5;
            if (inputMesValue == 'Junio') inputMesValue = 6;
            if (inputMesValue == 'Julio') inputMesValue = 7;
            if (inputMesValue == 'Agosto') inputMesValue = 8;
            if (inputMesValue == 'Septiembre') inputMesValue = 9;
            if (inputMesValue == 'Octubre') inputMesValue = 10;
            if (inputMesValue == 'Noviembre') inputMesValue = 11;
            if (inputMesValue == 'Diciembre') inputMesValue = 12;

            let inputComentariosValue = inputComentarios.value;
            let comentariosMesAño = `Comentarios (${inputMesValue}/${2021})`;
            if (localStorage.getItem(comentariosMesAño) === null) {
                let array = [inputComentariosValue, inputMesValue];
                localStorage.setItem(comentariosMesAño, array);
            } else {
                let datosLocalStorage = localStorage.getItem(comentariosMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputComentariosValue);
                let array = [datosLocalStorage, inputMesValue];
                localStorage.setItem(comentariosMesAño, array);
            }
        };

        if (inputPublicaciones.value != '') { guardarPublicaciones() };
        function guardarPublicaciones() {

            let inputMesValue = inputMes.value;
            if (inputMesValue == 'Enero') inputMesValue = 1;
            if (inputMesValue == 'Febrero') inputMesValue = 2;
            if (inputMesValue == 'Marzo') inputMesValue = 3;
            if (inputMesValue == 'Abril') inputMesValue = 4;
            if (inputMesValue == 'Mayo') inputMesValue = 5;
            if (inputMesValue == 'Junio') inputMesValue = 6;
            if (inputMesValue == 'Julio') inputMesValue = 7;
            if (inputMesValue == 'Agosto') inputMesValue = 8;
            if (inputMesValue == 'Septiembre') inputMesValue = 9;
            if (inputMesValue == 'Octubre') inputMesValue = 10;
            if (inputMesValue == 'Noviembre') inputMesValue = 11;
            if (inputMesValue == 'Diciembre') inputMesValue = 12;

            let inputPublicacionesValue = inputPublicaciones.value;
            let publicacionesMesAño = `Publicaciones (${inputMesValue}/${2021})`;
            if (localStorage.getItem(publicacionesMesAño) === null) {
                let array = [inputPublicacionesValue, inputMesValue];
                localStorage.setItem(publicacionesMesAño, array);
            } else {
                let datosLocalStorage = localStorage.getItem(publicacionesMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputPublicacionesValue);
                let array = [datosLocalStorage, inputMesValue];
                localStorage.setItem(publicacionesMesAño, array);
            }
        };

        if (inputCursosBiblicos.value != '') { guardarCursosBiblicos() };
        function guardarCursosBiblicos() {

            let inputMesValue = inputMes.value;
            if (inputMesValue == 'Enero') inputMesValue = 1;
            if (inputMesValue == 'Febrero') inputMesValue = 2;
            if (inputMesValue == 'Marzo') inputMesValue = 3;
            if (inputMesValue == 'Abril') inputMesValue = 4;
            if (inputMesValue == 'Mayo') inputMesValue = 5;
            if (inputMesValue == 'Junio') inputMesValue = 6;
            if (inputMesValue == 'Julio') inputMesValue = 7;
            if (inputMesValue == 'Agosto') inputMesValue = 8;
            if (inputMesValue == 'Septiembre') inputMesValue = 9;
            if (inputMesValue == 'Octubre') inputMesValue = 10;
            if (inputMesValue == 'Noviembre') inputMesValue = 11;
            if (inputMesValue == 'Diciembre') inputMesValue = 12;

            let inputCursosBiblicosValue = inputCursosBiblicos.value;
            let cursosBiblicosMesAño = `CursosBiblicos (${inputMesValue}/${2021})`;
            if (localStorage.getItem(cursosBiblicosMesAño) === null) {
                let array = [inputCursosBiblicosValue, inputMesValue];
                localStorage.setItem(cursosBiblicosMesAño, array);
            } else {
                let datosLocalStorage = localStorage.getItem(cursosBiblicosMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputCursosBiblicosValue);
                let array = [datosLocalStorage, inputMesValue];
                localStorage.setItem(cursosBiblicosMesAño, array);
            }
        }

        if (inputPresentacionVideos.value != '') { guardarPresentacionVideos() };
        function guardarPresentacionVideos() {
            let inputMesValue = inputMes.value;
            if (inputMesValue == 'Enero') inputMesValue = 1;
            if (inputMesValue == 'Febrero') inputMesValue = 2;
            if (inputMesValue == 'Marzo') inputMesValue = 3;
            if (inputMesValue == 'Abril') inputMesValue = 4;
            if (inputMesValue == 'Mayo') inputMesValue = 5;
            if (inputMesValue == 'Junio') inputMesValue = 6;
            if (inputMesValue == 'Julio') inputMesValue = 7;
            if (inputMesValue == 'Agosto') inputMesValue = 8;
            if (inputMesValue == 'Septiembre') inputMesValue = 9;
            if (inputMesValue == 'Octubre') inputMesValue = 10;
            if (inputMesValue == 'Noviembre') inputMesValue = 11;
            if (inputMesValue == 'Diciembre') inputMesValue = 12;


            let inputPresentacionVideosValue = inputPresentacionVideos.value;
            let presentacionVideoMesAño = `PresentacionVideos (${inputMesValue}/${2021})`;
            if (localStorage.getItem(presentacionVideoMesAño) === null) {
                let array = [inputPresentacionVideosValue, inputMesValue];
                localStorage.setItem(presentacionVideoMesAño, array);
            } else {
                let datosLocalStorage = localStorage.getItem(presentacionVideoMesAño);
                datosLocalStorage = parseInt(datosLocalStorage) + parseInt(inputPresentacionVideosValue);
                let array = [datosLocalStorage, inputMesValue]
                localStorage.setItem(presentacionVideoMesAño, array);
            }
        }
    }
}

let datos = localStorage.getItem('PresentacionVideos (11/2021)');


extraerDatosLocalStorage()
// Extraer datos del localStorage para ponerlo en la carpeta contenedora del registro del servicio para el mes
function extraerDatosLocalStorage() {
    extraerUnMes();
    function extraerUnMes() {
        let contenedorResultadoDelMes = document.querySelector(".container-containerResultadoMes");

        // Esto es para rellenar las carpetas correspondien al mes y para llenarla con contenido del servicio
        rellenarCarpetas();
        function rellenarCarpetas() {
            let inputMesValue = inputMes.value;
            if (inputMesValue == 'Enero') inputMesValue = 1;
            if (inputMesValue == 'Febrero') inputMesValue = 2;
            if (inputMesValue == 'Marzo') inputMesValue = 3;
            if (inputMesValue == 'Abril') inputMesValue = 4;
            if (inputMesValue == 'Mayo') inputMesValue = 5;
            if (inputMesValue == 'Junio') inputMesValue = 6;
            if (inputMesValue == 'Julio') inputMesValue = 7;
            if (inputMesValue == 'Agosto') inputMesValue = 8;
            if (inputMesValue == 'Septiembre') inputMesValue = 9;
            if (inputMesValue == 'Octubre') inputMesValue = 10;
            if (inputMesValue == 'Noviembre') inputMesValue = 11;
            if (inputMesValue == 'Diciembre') inputMesValue = 12;

            // Extraer los datos del INPUT MES en formato de numeros, correspondientes a su respectivo mes.

            let datosLocalStorageHoras = localStorage.getItem(`Horas (${inputMesValue}/${2021})`);
            let datosLocalStorageRevisitas = localStorage.getItem(`Revisitas (${inputMesValue}/${2021})`);
            let datosLocalStorageComentarios = localStorage.getItem(`Comentarios (${inputMesValue}/${2021})`);
            let datosLocalStoragePublicaciones = localStorage.getItem(`Publicaciones (${inputMesValue}/${2021})`);
            let datosLocalStorageCursosBiblicos = localStorage.getItem(`CursosBiblicos (${inputMesValue}/${2021})`);
            let datosLocalStoragePresentacionVideos = localStorage.getItem(`PresentacionVideos (${inputMesValue}/${2021})`);

            let arrayHoras = datosLocalStorageHoras;
            if (inputMes.value != '' && (arrayHoras === inputMes.value)) {

                // if (inputMes.value ==)
                contenedorResultadoDelMes.innerHTML += ``;
                contenedorResultadoDelMes.innerHTML += `<div>
                                                        <h3>${inputMes.value}</h3>
                                                        <div>
                                                        </div>
                                                    </div>`;

            }
        }
    }
}








// // Selección del nombre del mes para los nombres de las carpetas
// seleccionMes()
// function seleccionMes() {
//     let mesesDelAño = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

//     if (mes == 1) mes = mesesDelAño[0];
//     if (mes == 2) mes = mesesDelAño[1];
//     if (mes == 3) mes = mesesDelAño[2];
//     if (mes == 4) mes = mesesDelAño[3];
//     if (mes == 5) mes = mesesDelAño[4];
//     if (mes == 6) mes = mesesDelAño[5];
//     if (mes == 7) mes = mesesDelAño[6];
//     if (mes == 8) mes = mesesDelAño[7];
//     if (mes == 9) mes = mesesDelAño[8];
//     if (mes == 10) mes = mesesDelAño[9];
//     if (mes == 11) mes = mesesDelAño[10];
//     if (mes == 12) mes = mesesDelAño[11];
// }



// // Funcion para extraer el mes que se haya elegido dentro del INPUT MES
// extraerDatosInputMes();
// function extraerDatosInputMes() {
//     let inputMes = document.querySelector(".input-mes");
// }